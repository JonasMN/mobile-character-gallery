import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Card = ({ title, description, image }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.45,
    marginHorizontal: 5,
  },
  image: {
    width: 80,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  content: {
    marginLeft: 8,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
});

export default Card;
