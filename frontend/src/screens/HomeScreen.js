import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to eXit-Zork Adventure!</Text>
      <Button
        title="Start Adventure"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Load Game"
        onPress={() => {/* Logic to load a saved game */}}
      />
      <Button
        title="Settings"
        onPress={() => {/* Navigate to settings screen */}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
