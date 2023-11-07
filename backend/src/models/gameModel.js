const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  // Define your schema for the game
});

const GameModel = mongoose.model('Game', gameSchema);

module.exports = GameModel;
