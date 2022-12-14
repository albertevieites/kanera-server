const router = require("express").Router();

// GET "/api"
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));
router.use("/expenses", require("./expense.routes"));
router.use("/income", require("./income.routes"));
router.use("/budget", require("./budget.routes"));
router.use("/profile", require("./profile.routes"));
router.use("/upload", require("./upload.routes"));

module.exports = router;
