import React, { useState } from 'react';
import CommandInput from './components/CommandInput';
import GameDisplay from './components/GameDisplay';

// First Component
const GameInterface = () => {
  // Removed unused state variables and functions

  return (
    <View style={{ padding: 20 }}>
      {/* ... your existing JSX */}
    </View>
  );
};

// Second Component
const GameApp = () => {
  const [gameMessage, setGameMessage] = useState('');

  const handleCommandSubmit = async (command) => {
    // ... your existing code
  };

  return (
    <div>
      <CommandInput onSubmit={handleCommandSubmit} />
      <GameDisplay message={gameMessage} />
    </div>
  );
};

// Choose which component to export, you can't export both as default
export default GameInterface;
// If you need to export the second component, do so with a named export
export { GameApp };
