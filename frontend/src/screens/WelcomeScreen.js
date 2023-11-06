import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const WelcomeScreen = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CyberText Adventure!</Text>
      <Button title="Start Adventure" onPress={onStartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
