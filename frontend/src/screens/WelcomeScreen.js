import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types';

const WelcomeScreen = ({onStartGame}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CyberText Adventure!</Text>
      <Button title="Start Adventure" onPress={onStartGame} />
    </View>
  );
};

WelcomeScreen.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#000', // Example: cyber-style black background
  },
  title: {
    fontSize: 28,
    color: '#0ff', // optional: neon-cyan for a cyber look
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
