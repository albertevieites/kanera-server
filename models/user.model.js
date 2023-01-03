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
    city: {
      type: String,
    },
    country: {
      type: [String],
      enum: arrCountry,
    },
    image: {
      type: String,
      default: "https://avatars.dicebear.com/api/personas/your-custom-seed.svg",
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
