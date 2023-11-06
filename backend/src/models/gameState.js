const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the GameState Schema
const gameStateSchema = new Schema({
  playerId: {
    type: String,
    required: true,
    unique: true
  },
  currentRoom: {
    type: String,
    required: true
  },
  inventory: [{
    item: String,
    quantity: Number
  }],
  // ... other game state properties
});

module.exports = mongoose.model('GameState', gameStateSchema);
