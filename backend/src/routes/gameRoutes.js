// backend/src/routes/gameRoutes.js

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Route to handle player actions
router.post('/action', gameController.processAction);

// Route to process commands
router.post('/command', async (req, res) => {
  try {
    const { command, playerId } = req.body;
    const result = await gameController.processCommand(playerId, command);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;