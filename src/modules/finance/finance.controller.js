const Finance = require('./finance.model');
const financeService = require('./finance.service');
const asyncHandler = require('../../common/utils/asyncHandler');

// CREATE TRANSACTION
exports.createTransaction = asyncHandler(async (req, res) => {
  const transaction = await financeService.createTransaction({
    ...req.body,
    user: req.user.id
  });

  res.status(201).json({
    success: true,
    data: transaction
  });
});


// GET ALL (FILTER + SEARCH + SORT)
exports.getTransactions = async (req, res) => {
  try {
    const {
      type,
      category,
      search,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 5
    } = req.query;

    let query = { user: req.user.id };

    if (type) query.type = type;
    if (category) query.category = category;

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const transactions = await Finance.find(query)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Finance.countDocuments(query);

    res.json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: transactions
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Finance.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const updated = await Finance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Finance.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await transaction.deleteOne();

    res.json({
      success: true,
      message: 'Deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Balance
exports.getBalance = async (req, res) => {
  try {
    const transactions = await Finance.find({ user: req.user.id });

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === 'INCOME') income += t.amount;
      else expense += t.amount;
    });

    res.json({
      success: true,
      income,
      expense,
      balance: income - expense
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};