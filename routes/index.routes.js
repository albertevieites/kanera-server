const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/user", require("./user.routes"));
router.use("/income", require("./income.routes"));
router.use("/expenses", require("./expenses.routes"));

module.exports = router;
