// A utility to parse player commands into actionable data for the backend
export default class CommandParser {
    static parse(input) {
      // Trim the input and split by spaces to analyze
      const args = input.trim().split(/\s+/);
      const command = args.shift().toLowerCase();
  
      // Define patterns for different expected commands
      const directions = ['north', 'south', 'east', 'west', 'up', 'down'];
      const actions = ['take', 'drop', 'use', 'look', 'talk'];
  
      // Check if the command is a movement command
      if (directions.includes(command)) {
        return { type: 'MOVE', payload: { direction: command } };
      }
  
      // Check if the command is an action command
      if (actions.includes(command)) {
        // Further parsing can be done based on the action type
        switch (command) {
          case 'take':
            return { type: 'TAKE_ITEM', payload: { item: args.join(' ') } };
          case 'drop':
            return { type: 'DROP_ITEM', payload: { item: args.join(' ') } };
          case 'use':
            return { type: 'USE_ITEM', payload: { item: args.join(' ') } };
          case 'look':
            return { type: 'LOOK', payload: { object: args.join(' ') } };
          case 'talk':
            return { type: 'TALK', payload: { character: args.join(' ') } };
          default:
            return { type: 'UNKNOWN' };
        }
      }
  
      // Handle complex commands that start with "tell" or "ask"
      if (command === 'tell' || command === 'ask') {
        const character = args.shift();
        const message = args.join(' ');
        return { type: 'COMMUNICATE', payload: { character, message, mode: command } };
      }
  
      // If the command is not recognized, return an unknown action type
      return { type: 'UNKNOWN' };
    }
  }
  