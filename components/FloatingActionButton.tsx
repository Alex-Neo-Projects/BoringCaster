import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function FloatingActionButton() {
  const navigation = useNavigation();

  return ( 
    <TouchableOpacity style={styles.floatingButton} onPress={() => {navigation.navigate('Cast');}}>
      <Ionicons name="create-outline" size={40} color="white" />
    </TouchableOpacity>
 );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 70,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
});
