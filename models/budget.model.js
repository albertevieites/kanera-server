const { Schema, model } = require("mongoose");

const budgetSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    required: [true, "must provide amount"],
    default: 0,
  },
});

const Budget = model("Budget", budgetSchema);

module.exports = Budget;
