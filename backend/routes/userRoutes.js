const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersNameController");

// Define the route for fetching the user's name
router.get("/getUserName", userController.getUserName);

module.exports = router;
