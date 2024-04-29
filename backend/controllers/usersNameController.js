const mysql = require("mysql");

const dbConfig = require("../config/db.config");
const db = mysql.createConnection(dbConfig);

exports.getUserName = (req, res) => {
  const userId = req.user.userId;

  console.log("Attempting to fetch name for user ID:", userId); // Log for debugging purposes

  // Using the correct column names
  const query = "SELECT firstName FROM users WHERE userId = ?";
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error("DB Error:", error); // Log the actual error for debugging
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const userName = results[0].firstName;

    // Send the user's first name in the response
    res.status(200).json({ userName });
  });
};
