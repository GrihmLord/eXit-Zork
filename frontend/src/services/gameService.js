const GameState = require('./models/GameState');

class GameService {
  async processCommand(playerId, command) {
    // Retrieve the current game state for the player
    let state = await GameState.findOne({ playerId });

    if (!state) {
      // If no state exists, create a new one
      state = new GameState({ playerId, ...initialState });
      await state.save();
    }

    // Parse the command and update the game state accordingly
    const parsedCommand = this.parseCommand(command);
    const newState = this.updateGameState(state, parsedCommand);

    // Save the updated state to the database
    await state.updateOne(newState);

    // Generate a response based on the new state
    const response = this.generateResponse(newState);

    return { state: newState, response };
  }

  parseCommand(command) {
    // Complex command parsing logic goes here
    // For example, split the command into action and target
    const [action, ...target] = command.split(' ');
    return { action, target: target.join(' ') };
  }

  updateGameState(state, { action, target }) {
    // Update the game state based on the action and target
    // This is where you would handle different player actions
    // For simplicity, let's just log the action for now
    console.log(`Action: ${action}, Target: ${target}`);
    // Return the updated state
    return state;
  }

  generateResponse(state) {
    // Generate a response to the player based on the updated state
    // This could include narrative text, descriptions of the result of actions, etc.
    return `You try to ${state.lastAction} the ${state.lastTarget}.`;
  }
}

module.exports = new GameService();
