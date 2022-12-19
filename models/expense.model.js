const { Schema, model } = require("mongoose");

const arrCategory = require("../utils/category");
const arrMethod = require("../utils/method");

const expenseSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: [true, 'must provide date'],
    },
    description: {
      type: String,
      required: [true, 'must provide description'],
    },
    category: {
      type: [String],
      required: [true, 'must provide category'],
      enum: arrCategory,
    },
    method: {
      type: [String],
      required: [true, 'must provide method'],
      enum: arrMethod,
    },
    amount: {
      type: Number,
      required: [true, 'must provide amount'],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
