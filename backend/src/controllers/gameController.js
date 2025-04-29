const GameState = require('../models/gameState');
const CommandParser = require('../utils/CommandParser');
const actions = require('../game/actions');
const gameService = require('../services/gameService');

exports.processAction = async (req, res) => {
  try {
    const {playerId, action} = req.body;
    let gameState = await GameState.findOne({playerId});

    if (!gameState) {
      // If the game state does not exist, create a new one
      gameState = new GameState({
        playerId,
        currentRoom: 'startRoom',
        inventory: [],
      });
    }

    // Parse the action using the CommandParser utility
    const parsedAction = CommandParser.parse(action);

    // Update the game state based on the parsed action
    const updatedGameState = await handleGameLogic(gameState, parsedAction);

    // Save the updated game state
    await updatedGameState.save();

    res.json({message: 'Action processed', gameState: updatedGameState});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the action.');
  }
};

async function handleGameLogic(gameState, action) {
  let itemIndex; // Move declaration outside switch

  switch (action.type) {
    case 'MOVE':
      // Handle player movement
      gameState.currentRoom = action.payload.room;
      break;
    case 'PICK_UP':
      // Handle picking up an item
      itemIndex = gameState.inventory.findIndex(
        item => item.name === action.payload.itemName,
      );
      if (itemIndex > -1) {
        gameState.inventory[itemIndex].quantity += 1;
      } else {
        gameState.inventory.push({item: action.payload.itemName, quantity: 1});
      }
      break;
    // Add more cases for different types of actions
    default:
      throw new Error('Unknown action type');
  }
  return gameState;
}

// backend/src/controllers/gameController.js

const actions = require('../game/actions');
const gameService = require('../services/gameService');

const processAction = async (req, res) => {
  // Logic to process player action
};

const processCommand = async (playerId, command) => {
  // Use the actions and gameService to process the command
  // ...
};

module.exports = {
  processAction,
  processCommand,
};
