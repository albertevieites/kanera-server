const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/expenses", require("./expenses.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
