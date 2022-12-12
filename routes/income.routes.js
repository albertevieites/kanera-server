const router = require("express").Router();
const Income = require("../models/Income.model");

// GET "/api/income" Send a GET request of the Income
router.get("/", async (req, res, next) => {
  try {
    const allIncome = await Income.find();
    res.json(allIncome);
  } catch (err) {
    next(err);
  }
});

// POST "/api/income" Send a POST request of the Income
router.post("/", async (req, res, next) => {
  const { date, type , amount } = req.body;

  if (!date || !type || !amount === undefined) {
    res.json({ errorMessage: "fields not provided" });
  }

  try {
    const newIncome = await Income.create({
      date,
      type,
      amount,
    });
    res.json(newIncome);
  } catch (error) {
    next(error);
  }
});

// GET "/api/income/:id" Send details from a single income
router.get("/:id", async (req, res, next) => {
  console.log(req.params);

  const { id } = req.params;

  try {
    const singleIncome = await Income.findById(id);

    res.json(singleIncome);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/income/:id" Delete a single income
router.delete("/:id", async (req, res, next) => {
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
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { date, type, amount } = req.body;

  if (!date || !type || !amount) {
    res.json({ errorMessage: "Fields not completed!" });
  }

  try {
    await Income.findByIdAndUpdate(id, {
      date,
      type,
      amount,
    });
    res.json("updated income successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
