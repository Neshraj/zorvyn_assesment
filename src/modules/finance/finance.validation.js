const Joi = require('joi');

exports.createTransactionSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().valid('INCOME', 'EXPENSE').required(),
  category: Joi.string().optional()
});