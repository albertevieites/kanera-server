const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: 5,
    },
    expense: [{type: Schema.Types.ObjectId, ref: "Expense"}],
    income: [{type: Schema.Types.ObjectId, ref: "Income"}],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
