const router = require("express").Router();
const Expense = require("../models/expense.model");

router.route("/").get((req, res) => {
  Expense.find()
    .then((expenses) => res.json(expenses))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const amount = req.body.amount;
  const date = Date.parse(req.body.date);

  const newExpense = new Expense({
    name,
    category,
    amount,
    date,
  });

  newExpense
    .save()
    .then(() => res.json("Expense added successfully!🌟"))
    .catch((err) => res.status(400).json("Error: " + err))
});

module.exports = router;
