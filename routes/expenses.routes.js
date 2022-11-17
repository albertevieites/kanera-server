const router = require("express").Router();
const Expenses = require("../models/expense.model");

// GET "/api/expenses" Send a GET request of the Expenses
router.route("/").get((req, res) => {
  Expenses.find()
    .then((expenses) => res.json(expenses))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* router.get("/", async (req, res, next) => {
  try {
    const allExpenses = await Expenses.find();
    res.json(allExpenses);
  } catch (error) {
    next(error);
  }
}); */

// POST "/api/expenses" Send a POST request of the Expenses
router.route("/").post((req, res) => {
  const { name, category, method, amount } = req.body;

  const newExpense = new Expenses({
    name,
    category,
    method,
    amount,
    date: Date.parse(req.body.date),
  });

  newExpense
    .save()
    .then(() => res.json("Expense added successfully!🌟"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET "/api/expenses/:id" Send details from a single expense
router.route("/:id").get((req, res) => {
  const { id } = req.params;

  Expenses.findById(id)
    .then((expenses) => res.json(expenses))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE "/api/expenses/:id" Delete a single expense in the Expenses
router.route("/:id").delete((req, res) => {
  const { id } = req.params;

  Expenses.findByIdAndDelete(id)
    .then(() => res.json("Expense record deleted!"))
    .catch((err) => res.status(400).json("Error " + err));
});

// POST "/api/expenses/:id" Get changes and edit expense by id
router.route("/:id").patch((req, res) => {
  const { id } = req.params;
  const { name, category, method, amount, date } = req.body;

  if (!name || !category || !method || !amount || !date) {
    res.json({ errorMessage: "Fields not completed!" });
  }

  Expenses.findByIdAndUpdate(id)
    .then((expenses) => {
      expenses.name = name;
      expenses.category = category;
      expenses.method = method;
      expenses.amount = amount;
      expenses.date = date;

      expenses
        .save()
        .then(() => res.json("Expense record updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
