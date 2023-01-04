const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const Budget = require("../models/budget.model");
const User = require("../models/user.model");

// GET "/api/budget"
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allBudget = await Budget.find().populate("owner");
    console.log(allBudget);
    res.json(allBudget);
  } catch (err) {
    next(err);
  }
});

// POST "/api/budget" Send a POST request of the Budget
router.post("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { amount } = req.body;

  if (!amount === undefined) {
    res.json({ errorMessage: "fields not provided" });
  }

  try {
    const newBudget = await Budget.create({
      amount,
      owner: userId,
    });

    const updateDBBudget = await User.findByIdAndUpdate(userId, {
      $push: { budget: newBudget },
    });

    res.json(newBudget);
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/budget/:id" Get changes, edit and update expense by id
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { amount, owner } = req.body;

  if (!amount) {
    res.json({ errorMessage: "Fields not completed!" });
  }

  try {
    await Budget.findByIdAndUpdate(id, {
      amount,
      owner,
    });
    res.json("updated expense successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
