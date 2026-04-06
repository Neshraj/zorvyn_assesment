const express = require('express');
const router = express.Router();

const { protect } = require('../../common/middleware common/auth.middleware');
const financeController = require('./finance.controller');


const validate = require('../../common/middleware common/validate.middleware');
const { createTransactionSchema } = require('./finance.validation');

router.post(
  '/',
  protect,
  validate(createTransactionSchema),
  financeController.createTransaction
);
router.get('/', protect, financeController.getTransactions);
router.put('/:id', protect, financeController.updateTransaction);
router.delete('/:id', protect, financeController.deleteTransaction);

module.exports = router;