import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';

const CommandInput = ({ onCommandSubmit }) => {
  const [command, setCommand] = useState('');

  const handleSubmit = () => {
    onCommandSubmit(command);
    setCommand('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your command..."
        value={command}
        onChangeText={setCommand}
        onSubmitEditing={handleSubmit}
      />
      <Button title="Enter" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});

export default CommandInput;
