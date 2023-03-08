import { TextInput, Text, SafeAreaView, Button } from 'react-native';
import { WalletContext } from '../context/WalletContext';
import { useContext, useState } from 'react';
import { publishCast } from "@standard-crypto/farcaster-js";
import { useNavigation } from '@react-navigation/native';

export function Cast() {
  const { wallet } = useContext(WalletContext);
  const [castText, setCastText] = useState('');
  const [error, setError] = useState(''); 

  const navigation = useNavigation();

  async function submitCast() { 
    try {
      setError('');

      await publishCast(wallet, castText);
      
      navigation.navigate('Home')
    } catch (e) { 
      setError(e.toString());
    }
  }

  return (
    <SafeAreaView>
      <Text style={{paddingLeft: 14, fontSize: 20}}>Hello castr, what's on your mind? </Text>
      <TextInput
        multiline={true}
        numberOfLines={9}
        style={{ height: '50%', width: '90%', margin: 12, borderColor: 'gray', borderRadius: 10, borderWidth: 1, padding: 10}}
        onChangeText={setCastText}
        value={castText}
      />

      <Text style={{fontSize: 20, color: 'red', textAlign: 'center'}}>{error}</Text>
      <Button title='Submit' onPress={() => submitCast()}/>
    </SafeAreaView>
 );
}
