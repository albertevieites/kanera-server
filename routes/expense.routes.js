const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const Expense = require("../models/expense.model");
const User = require("../models/user.model");

// GET "/api/expenses" Send a GET request of the Expenses
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allExpenses = await Expense.find().populate("owner");
    console.log(allExpenses);
    res.json(allExpenses);
  } catch (err) {
    next(err);
  }
});

// POST "/api/expenses" Send a POST request of the Expenses
router.post("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { date, description, category, method, amount } = req.body;

  if (!date || !description || !category || !method || !amount === undefined) {
    res.json({ errorMessage: "fields not provided" });
  }

  try {
    const newExpense = await Expense.create({
      date,
      description,
      category,
      method,
      amount,
      owner: userId,
    });

    const updateDBExpense = await User.findByIdAndUpdate(userId, {
      $push: { expense: newExpense }
    })

    res.json(newExpense);
  } catch (error) {
    next(error);
  }
});

// GET "/api/expenses/:id" Send details from a single expense
router.get("/:id", isAuthenticated, async (req, res, next) => {
  // console.log(req.params);

  const { id } = req.params;

  try {
    const singleExpense = await Expense.findById(id).populate("owner");

    res.json(singleExpense);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/expenses/:id" Delete a single expense in the Expenses
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await Expense.findByIdAndDelete(id);
    // res.status(200).json();
    res.json("expense deleted");
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/expenses/:id" Get changes, edit and update expense by id
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { date, description, category, method, amount, owner } = req.body;

  if (!date || !description || !category || !method || !amount) {
    res.json({ errorMessage: "Fields not completed!" });
  }

  try {
    await Expense.findByIdAndUpdate(id, {
      date,
      description,
      category,
      method,
      amount,
      owner,
    });
    res.json("updated expense successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
