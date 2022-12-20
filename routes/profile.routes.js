const router = require("express").Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

const User = require("../models/user.model");

// GET "/api/profile/:id" Send a POST request a specific Profile
router.get("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const singleProfile = await User.findById(id);

    res.json(singleProfile);
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/profile/:id" Get changes, edit or update a specific Profile
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { fullname, email, profession, age, gender, country } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      fullname,
      email,
      profession,
      age,
      gender,
      country
    })
    res.json("updated profile successfully")
  } catch (error) {
    next(error);
  }
});

module.exports = router;
