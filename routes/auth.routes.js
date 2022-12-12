const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

// POST "/api/auth/signup" => get a profile and create it into the database
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Please fill in all the required fields" });
    return; // route arrives up to here
  }

  try {
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (foundUser !== null) {
      res
        .status(400)
        .json({ errorMessage: "A user with this email already exists" });
      return;
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create the user into the database
    await User.create({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });
    res.status(201).json();

  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" => validate user credentials
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Validations
  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "You must fill in all the required fields" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "User not found" });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    console.log("isPasswordValid", isPasswordValid);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Password is not valid" });
    }

    // OK, the user is who they say they are
    // User is validated
    // Create the session... JWT token (json web token). Create token to use JWT

    // Create payload
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    }; // payload will be like req.session.user

    // Create token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "12h",
    });

    res.json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => verify that the user has been authenticated and is active
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("verifying token");
  console.log(req.payload);
  // if we want info of the user accessing to the route, req.payload
  // req.payload === req.session.user
  // we have access to req.payload ONLY if we use the isAuthenticated middleware
  res.json(req.payload);
});

module.exports = router;
