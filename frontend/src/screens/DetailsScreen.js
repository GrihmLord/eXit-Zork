import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const DetailsScreen = () => {
  // Placeholder for details data
  const detailsData = {
    title: 'Mysterious Dungeon',
    description: 'You find yourself in a dimly lit dungeon...',
    image: 'path-to-dungeon-image',
    // More details...
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: detailsData.image }}
        style={styles.image}
      />
      <Text style={styles.title}>{detailsData.title}</Text>
      <Text style={styles.description}>{detailsData.description}</Text>
      {/* Additional UI components to enrich the details screen */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    padding: 10,
    textAlign: 'justify',
  },
  // Additional styles...
});

export default DetailsScreen;
