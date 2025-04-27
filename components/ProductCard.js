import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* For local images use require */}
      <Image 
        source={product.image} 
        style={styles.thumbnail} 
      />
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <Text>{product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
