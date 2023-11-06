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
  