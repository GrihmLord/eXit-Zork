import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

const DetailsScreen = () => {
  const detailsData = {
    title: 'Mysterious Dungeon',
    description: 'You find yourself in a dimly lit dungeon, filled with secrets and hidden dangers.',
    image: 'https://via.placeholder.com/300x200.png?text=Mysterious+Dungeon',
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: detailsData.image }}
        style={styles.image}
      />
      <Text style={styles.title}>{detailsData.title}</Text>
      <Text style={styles.description}>{detailsData.description}</Text>
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
});

export default DetailsScreen;
