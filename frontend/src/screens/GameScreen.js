import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import StoryText from './StoryText';
import CommandInput from './CommandInput';
import axios from 'axios'; // Import axios for making HTTP requests

const GameScreen = () => {
  const [story, setStory] = useState('The game begins...');
  const playerId = 'unique-player-id'; // This should be unique for each player

  const handleCommandSubmit = async command => {
    // Append the command to the story first
    setStory(prevStory => `${prevStory}\n> ${command}`);

    try {
      // Send the command to the server
      const response = await axios.post('http://localhost:3000/command', {
        command,
        playerId,
      });
      const {state, response: gameResponse} = response.data;

      // Update the story with the response from the server
      setStory(prevStory => `${prevStory}\n${gameResponse}`);
    } catch (error) {
      // If there's an error, log it and update the story to show the error
      console.error('Error processing command:', error);
      setStory(prevStory => `${prevStory}\nError processing command.`);
    }
  };

  return (
    <View style={styles.container}>
      <StoryText text={story} />
      <CommandInput onCommandSubmit={handleCommandSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GameScreen;
