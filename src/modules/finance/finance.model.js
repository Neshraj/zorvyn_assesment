const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['INCOME', 'EXPENSE'],
      required: true
    },
    category: {
      type: String,
      default: 'GENERAL'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Finance', financeSchema);