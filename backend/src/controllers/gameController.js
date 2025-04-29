const GameState = require('../models/gameState');
const CommandParser = require('../utils/CommandParser');
const actions = require('../game/actions');
const gameService = require('../services/gameService');

exports.processAction = async (req, res) => {
  try {
    const {playerId, action} = req.body;
    let gameState = await GameState.findOne({playerId});

    if (!gameState) {
      gameState = new GameState({
        playerId,
        currentRoom: 'startRoom',
        inventory: [],
      });
    }

    const parsedAction = CommandParser.parse(action);
    const updatedGameState = await handleGameLogic(gameState, parsedAction);

    await updatedGameState.save();

    res.json({message: 'Action processed', gameState: updatedGameState});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the action.');
  }
};

async function handleGameLogic(gameState, action) {
  let existingItem;

  switch (action.type) {
    case 'MOVE':
      gameState.currentRoom = action.payload.room;
      break;

    case 'PICK_UP':
      existingItem = gameState.inventory.find(
        item => item.item === action.payload.itemName,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        gameState.inventory.push({item: action.payload.itemName, quantity: 1});
      }
      break;

    default:
      throw new Error('Unknown action type');
  }

  return gameState;
}

exports.processCommand = async (playerId, command) => {
  const parsedAction = CommandParser.parse(command);
  const gameState = await GameState.findOne({playerId});

  if (!gameState) {
    throw new Error('Game state not found');
  }

  const updatedGameState = await handleGameLogic(gameState, parsedAction);
  await updatedGameState.save();
  return updatedGameState;
};
