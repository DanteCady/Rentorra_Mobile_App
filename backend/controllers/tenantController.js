// controllers/tenantController.js
const mysql = require('mysql');
const dbConfig = require('../config/db.config');
const util = require('util'); // Add this to use util.promisify

// Create a database connection using the dbConfig
const db = mysql.createConnection(dbConfig);

// Promisify db.query
db.query = util.promisify(db.query);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

// Create Tenant in the database
function createTenant(req, res) {
  const { firstName, lastName, phoneNumber, assignedPropertyId } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ message: "First name and last name are required" });
  }

  // SQL query to insert data
  const query = 'INSERT INTO Tenants (firstName, lastName, phoneNumber, assignedPropertyId) VALUES (?, ?, ?, ?)';

  db.query(query, [firstName, lastName, phoneNumber, assignedPropertyId], (error, results) => {
    if (error) {
      console.error('Error inserting tenant into the database: ', error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
    res.status(201).json({ message: "Tenant created successfully", tenantId: results.insertId });
  });
}

// Retrieve all Tenants from the database
function getTenants(req, res) {
  const landlordId = req.user.userId;

  // Adjust your SQL query to filter tenants by the current user's ID as their landlord
  const query = 'SELECT * FROM tenants WHERE landlordId = ?';

  db.query(query, [landlordId], (error, results) => {
    if (error) {
      console.error('Error fetching tenants from the database: ', error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
    res.status(200).json({ tenants: results });
  });
}

async function mapTenantToLandlord(req, res) {
  const { userId } = req.body; // The tenant's userId
  const landlordId = req.user.userId; // The landlord's userId from the JWT

  try {
    // Check if the provided tenant exists
    const checkTenantQuery = 'SELECT id FROM tenants WHERE userId = ?';
    const tenants = await db.query(checkTenantQuery, [userId]);

    // The query now returns an array of tenants, so check if any were found
    if (tenants.length === 0) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Extract the tenant's ID
    const tenantId = tenants[0].id;

    // Update the tenant's landlordId
    const mapQuery = 'UPDATE tenants SET landlordId = ? WHERE id = ?';
    await db.query(mapQuery, [landlordId, tenantId]);

    res.status(200).json({ message: 'Tenant mapped to landlord successfully' });
  } catch (error) {
    console.error('Error mapping tenant to landlord:', error);
    res.status(500).json({
      message: 'Failed to map tenant to landlord',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}


module.exports = {
  createTenant,
  getTenants,
  mapTenantToLandlord
};
