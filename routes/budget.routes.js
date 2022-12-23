const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const Expense = require("../models/expense.model");
const User = require("../models/user.model");

// GET "/api/budget"
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allBudget = await Expense.find().select("category").populate("owner");
    console.log(allBudget);
    res.json(allBudget);
  }catch(err) {
    next(err);
  }
})

module.exports = router;