const express = require('express');
const mongoose = require('mongoose');
const gameService = require('./services/gameService');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/cybertext', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Endpoint to process commands
app.post('/command', async (req, res) => {
  try {
    const { command, playerId } = req.body;
    const result = await gameService.processCommand(playerId, command);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
