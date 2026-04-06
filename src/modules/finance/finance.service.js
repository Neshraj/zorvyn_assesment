const Finance = require('./finance.model');

exports.createTransaction = async (data) => {
  return await Finance.create(data);
};

exports.getTransactions = async (query, options) => {
  const { skip, limit, sort } = options;

  const data = await Finance.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Finance.countDocuments(query);

  return { data, total };
};