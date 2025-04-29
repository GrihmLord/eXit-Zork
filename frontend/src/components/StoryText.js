import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

const StoryText = ({text}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.storyText}>{text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  storyText: {
    fontSize: 18,
  },
});

export default StoryText;
