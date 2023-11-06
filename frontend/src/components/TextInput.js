import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomTextInput = ({ placeholder, onCommandSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    // Input validation or preprocessing can be done here
    setInputValue(text);
  };

  const handleSubmitEditing = () => {
    if (inputValue.trim()) {
      onCommandSubmit(inputValue.trim());
      setInputValue(''); // Clear the input after submission
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={inputValue}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="send"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmitEditing}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#5c5',
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomTextInput;
