const { Schema, model } = require("mongoose");

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
      enum: [
        "Bills",
        "Charity",
        "Concerts",
        "Shopping",
        "Eating Out",
        "Entertainment",
        "Finances",
        "General",
        "Gifts",
        "Groceries",
        "Gym",
        "Healthcare",
        "Holidays",
        "Housing",
        "Transportation",
      ],
    },
    method: {
      type: [String],
      required: [true, 'must provide method'],
      enum: ["Card", "Cash", "Direct Debit"],
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
