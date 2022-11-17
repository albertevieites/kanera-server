const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
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
      type: [{ type: String }],
      required: true,
      enum: ["Card", "Cash", "Direct Debit"],
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
