// routes/auth.routes.js

const express = require("express");
const router = express.Router();

// Import controllers
const loginController = require("../controllers/loginController.js");
const signupController = require("../controllers/signupController.js");

// Define the POST route for user login
router.post("/login", loginController.login);

// Define the POST route for user signup
router.post("/signup", signupController.signUp);

module.exports = router;
