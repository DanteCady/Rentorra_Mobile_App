// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.post('/create', propertyController.createProperty);
router.get('/all', propertyController.getProperties);

module.exports = router;
