const router = require("express").Router();
const Expenses = require("../models/Expense.model");

// GET "/api/expenses" Send a GET request of the Expenses
router.get("/", async (req, res, next) => {
  try {
    const allExpenses = await Expenses.find();
    res.json(allExpenses);
  } catch (err) {
    next(err);
  }
});

// POST "/api/expenses" Send a POST request of the Expenses
router.post("/", async (req, res, next) => {
  const { date, description, category, method, amount } = req.body;

  if (!date || !description || !category || !method || !amount === undefined) {
    res.json({ errorMessage: "fields not provided" });
  }

  try {
    const newExpense = await Expenses.create({
      date,
      description,
      category,
      method,
      amount,
    });
    res.json(newExpense);
  } catch (error) {
    next(error);
  }
});

// GET "/api/expenses/:id" Send details from a single expense
router.get("/:id", async (req, res, next) => {
  console.log(req.params);

  const { id } = req.params;

  try {
    const singleExpense = await Expenses.findById(id);

    res.json(singleExpense);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/expenses/:id" Delete a single expense in the Expenses
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await Expenses.findByIdAndDelete(id);
    // res.status(200).json();
    res.json("expense deleted");
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/expenses/:id" Get changes, edit and update expense by id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { date, description, category, method, amount } = req.body;

  if (!date || !description || !category || !method || !amount) {
    res.json({ errorMessage: "Fields not completed!" });
  }

  try {
    await Expenses.findByIdAndUpdate(id, {
      date,
      description,
      category,
      method,
      amount,
    });
    res.json("updated expense successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
