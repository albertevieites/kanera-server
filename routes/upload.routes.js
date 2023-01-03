const router = require("express").Router();

const uploader = require("../config/cloudinary.config");

// POST "/api/upload" => get image from Frontend and send it to Cloudinary. Send to Frontend the image URL
router.post("/", uploader.single("image"), (req, res, next) => {
  // Get URL from Cloudinary
  if (req.file === undefined) {
    res.status(400).json({ errorMessage: "Incorrect image or not image" });
    return;
  }
  res.json({imageUrl: req.file.path})
});

module.exports = router;
