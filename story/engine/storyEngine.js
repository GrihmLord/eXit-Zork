const fs = require('fs');

class CommandParser {
  constructor(commands) {
    this.commands = commands; // Commands should be an array of command objects
  }

  parse(input) {
    const parts = input.trim().toLowerCase().split(' '); // Split the input into parts
    const verb = parts[0];
    const noun = parts.slice(1).join(' ');

    const command = this.commands.find(
      cmd => cmd.verb === verb && cmd.noun === noun,
    );
    if (command) {
      return command.action(); // Execute the command's action and return the result
    } else {
      return "You can't do that."; // Default message if command is not found
    }
  }
}

class StoryEngine {
  constructor(storyFile) {
    this.storyData = JSON.parse(fs.readFileSync(storyFile, 'utf8'));
    this.currentScene = this.storyData.scenes[0];
    this.commandParser = new CommandParser(this.currentScene.commands);
  }

  displayCurrentScene() {
    console.log(this.currentScene.description);
    this.currentScene.options?.forEach((option, index) => {
      console.log(`${index + 1}. ${option.text}`);
    });
  }

  handleOptionSelection(index) {
    const selectedOption = this.currentScene.options[index - 1];
    if (selectedOption) {
      this.transitionToScene(selectedOption.leadsTo);
    } else {
      console.log('Invalid option selected.');
    }
  }

  transitionToScene(sceneId) {
    const nextScene = this.storyData.scenes.find(scene => scene.id === sceneId);
    if (nextScene) {
      this.currentScene = nextScene;
      this.displayCurrentScene();
    } else {
      console.log('Scene not found.');
    }
  }

  // Override the handleCommandInput method to use the CommandParser
  handleCommandInput(input) {
    const result = this.commandParser.parse(input);
    console.log(result);
  }
}

// Usage
const storyEngine = new StoryEngine('./story.json');
storyEngine.displayCurrentScene();
storyEngine.handleCommandInput('examine room'); // Example command
