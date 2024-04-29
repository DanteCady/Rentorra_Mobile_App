
// controllers/propertyController.js
const mysql = require('mysql');
const dbConfig = require ('../config/db.config')


// Create a database connection using the dbConfig
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

// Create Property in the database
function createProperty(req, res) {
  const { address, apartment, city, state, zip, rentAmount } = req.body;

  // Extract landlordId from authenticated user information
  const landlordId = req.user.userId; // Adjust based on JWT middleware's user object structure

  if (!address || !city || !state || !zip || !rentAmount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const propertyId = Math.floor(100000000 + Math.random() * 900000000);

  const query = 'INSERT INTO Properties (landlordId, propertyId, address, city, state, zip, apartment, rentAmount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [landlordId, propertyId.toString(), address, city, state, zip, apartment, rentAmount], (error, results) => {
    if (error) {
      console.error('Error inserting property into the database: ', error);
      return res.status(500).json({ message: "Failed to insert property into the database" });
    }
    res.status(201).json({ message: "Property created successfully", propertyId: propertyId });
  });
}


// Retrieve all Properties from the database
function getProperties(req, res) {
  const query = 'SELECT * FROM Properties';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching properties from the database: ', error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
    res.status(200).json({ properties: results });
  });
}

module.exports = {
  createProperty,
  getProperties
};
