const { Schema, model } = require("mongoose");

const arrGender = require("../utils/gender");
const arrCountry= require("../utils/country");

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
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: 6,
    },
    profession: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: [String],
      enum: arrGender,
    },
    country: {
      type: [String],
      enum: arrCountry,
    },
    expense: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
    income: [{ type: Schema.Types.ObjectId, ref: "Income" }],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
