import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FloatingActionButton() {
  return ( 
    <TouchableOpacity style={styles.floatingButton}>
      <Text style={styles.buttonText}>Cast</Text>
    </TouchableOpacity>
 );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
