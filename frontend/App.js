import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const App = () => {
  const [input, setInput] = useState('');
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');

  const handleCommand = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/game/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerId: 'unique-player-id', action: input })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      setGameState(data.gameState);
      setInput('');
    } catch (error) {
      setError(error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to eXit-Zork Adventure Game</Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Enter command"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Submit Command" onPress={handleCommand} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Text>Game State: {JSON.stringify(gameState)}</Text>
    </View>
  );
};

export default App;
