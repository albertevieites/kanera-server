const router = require("express").Router(); 
const isAuthenticated = require("../middlewares/isAuthenticated");

const User = require("../models/user.model");
const fileUploader = require("../config/cloudinary.config");


// GET "/api/profile/:id" Send a POST request a specific Profile
router.get("/:id", isAuthenticated, async (req, res, next) => {
  console.log(req.params);

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
  const { fullname, email, profession, age, gender, city, country, image } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      fullname,
      email,
      profession,
      age,
      gender,
      city,
      country,
      image
    })
    res.json("updated profile successfully")
  } catch (error) {
    next(error);
  }
});

module.exports = router;
