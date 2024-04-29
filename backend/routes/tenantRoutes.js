// routes/tenantRoutes.js
const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

// Route for creating a new tenant
router.post('/create', tenantController.createTenant);

// Route for mapping a tenant to a landlord
router.post('/mapToLandlord', tenantController.mapTenantToLandlord);

// Route for getting all tenants
router.get('/all', tenantController.getTenants);

module.exports = router;
