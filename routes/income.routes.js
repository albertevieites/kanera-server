const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const Income = require("../models/income.model");
const User = require("../models/user.model");


// GET "/api/income" Send a GET request of the Income
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allIncome = await Income.find().populate("owner");
    console.log(allIncome);
    res.json(allIncome);
  } catch (err) {
    next(err);
  }
});

// POST "/api/income" Send a POST request of the Income
router.post("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { date, type , amount } = req.body;

  if (!date || !type || !amount === undefined) {
    res.json({ errorMessage: "fields not provided" });
  }

  try {
    const newIncome = await Income.create({
      date,
      type,
      amount,
      owner: userId,
    });

    const updateDBIncome = await User.findByIdAndUpdate(userId, {
      $push: { income: newIncome }
    })

    res.json(newIncome);
  } catch (error) {
    next(error);
  }
});

// GET "/api/income/:id" Send details from a single income
router.get("/:id", isAuthenticated, async (req, res, next) => {
  // console.log(req.params);

  const { id } = req.params;

  try {
    const singleIncome = await Income.findById(id).populate("owner");

    res.json(singleIncome);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/income/:id" Delete a single income
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await Income.findByIdAndDelete(id);
    // res.status(200).json();
    res.json("income deleted");
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/income/:id" Get changes, edit and update income by id
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { date, type, amount, owner } = req.body;

  if (!date || !type || !amount) {
    res.json({ errorMessage: "Fields not completed!" });
  }

  try {
    await Income.findByIdAndUpdate(id, {
      date,
      type,
      amount,
      owner,
    });
    res.json("updated income successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
