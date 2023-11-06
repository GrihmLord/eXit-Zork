const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Route to handle player actions
router.post('/action', gameController.processAction);

module.exports = router;
