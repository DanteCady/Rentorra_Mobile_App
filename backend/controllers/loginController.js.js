require("dotenv").config();

const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbConfig = require("../config/db.config");

const db = mysql.createConnection(dbConfig);

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Query the database to find the user by email
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (error, results) => {
    if (error) {
      return res.status(500).send({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(401).send({ message: "User not found." });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error comparing passwords.", error: err });
      }

      if (!isMatch) {
        return res.status(401).send({ message: "Incorrect password." });
      }

      // Include the user's type in the response
      const token = jwt.sign(
        { userId: user.userId, userType: user.userType },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );


      res.status(200).json({ token, userType: user.userType });
    });
  })};