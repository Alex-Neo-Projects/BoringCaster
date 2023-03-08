import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FloatingActionButton() {
  const navigation = useNavigation();

  return ( 
    <TouchableOpacity style={styles.floatingButton} onPress={() => {navigation.navigate('Cast');}}>
      <Text style={styles.buttonText}>Cast</Text>
    </TouchableOpacity>
 );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
});
