const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware setup
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Database connection setup
const dbConfig = require("./config/db.config");
const db = mysql.createConnection(dbConfig);

// db.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to the database.");
// });

// JWT Secret Key (This is for demonstration. In production, always use environment variables.)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY // Update with your secret key
console.log(JWT_SECRET_KEY)
// Authentication Middleware
const verifyToken = (req, res, next) => {
  const tokenHeader = req.header("Authorization");
  if (!tokenHeader) {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const parts = tokenHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token format is invalid" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token format is incorrect" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log("Decoded user:", decoded);
    req.user = decoded; // Set the decoded user object on the request object
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Import routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const tenantRoutes = require('./routes/tenantRoutes'); 
const propertyRoutes = require('./routes/propertyRoutes');

// Routes setup
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/tenants",verifyToken, tenantRoutes);
app.use("/api/properties", verifyToken, propertyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
