const express = require('express');
const router = express.Router();

const controller = require('../controllers/');

router.get('/health', controller.healthCheck);

router.get('/seed', controller.seedData);

router.get('/users', controller.getUsers);

module.exports = router;