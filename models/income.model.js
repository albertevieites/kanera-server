const { Schema, model } = require("mongoose");

const incomeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: [true, 'must provide date'],
    },
    type: {
      type: String,
      required: [true, 'must provide description'],
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

const Income = model("Income", incomeSchema);

module.exports = Income;
