// A utility to parse player commands into actionable data
class CommandParser {
    static parse(input) {
      const args = input.trim().split(' ');
      const command = args.shift().toLowerCase();
      switch (command) {
        case 'go':
          return { type: 'MOVE', payload: { room: args.join(' ') } };
        case 'take':
          return { type: 'PICK_UP', payload: { itemName: args.join(' ') } };
        // Add more cases for different commands
        default:
          return { type: 'UNKNOWN' };
      }
    }
  }
  
  module.exports = CommandParser;
  
  // backend/src/game/commandParser.js

const actions = require('./actions');
const GameState = require('./GameState');

const parseInput = (input) => {
  // Logic to split input into verb and noun
};

const findAction = (verb) => {
  // Logic to find the action based on verb or synonyms
};

const handleCommand = (input, gameState) => {
  const [verb, noun] = parseInput(input);
  const action = findAction(verb);

  if (!action) {
    return `I don't understand what you mean by '${verb}'.`;
  }

  try {
    return action.execute(noun, gameState);
  } catch (error) {
    return `You can't do that because: ${error.message}`;
  }
};

module.exports = handleCommand;

const GameState = require('./GameState');
const actions = require('./actions');

function parseInput(input) {
  // Split the input into verb and noun
  // This is a simple parser and may need to be expanded for more complex inputs
  const parts = input.trim().split(' ');
  return { verb: parts[0], noun: parts.slice(1).join(' ') };
}

function findAction(verb) {
  // Find the action based on the verb or its synonyms
  return Object.values(actions).find(action =>
    action.verb === verb || (action.synonyms && action.synonyms.includes(verb))
  );
}

function handleCommand(input, gameState) {
  const { verb, noun } = parseInput(input);
  const action = findAction(verb);

  if (!action) {
    return `I don't understand what you mean by '${verb}'.`;
  }

  try {
    return action.execute(noun, gameState);
  } catch (error) {
    return `You can't do that because: ${error.message}`;
  }
}

module.exports = { handleCommand };
