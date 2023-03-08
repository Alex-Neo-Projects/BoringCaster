import { TextInput, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { WalletContext } from '../context/WalletContext';
import { useContext, useState } from 'react';
import { publishCast } from "@standard-crypto/farcaster-js";
import { useNavigation } from '@react-navigation/native';

export function Cast() {
  const { wallet } = useContext(WalletContext);
  const [castText, setCastText] = useState('');
  const [error, setError] = useState(''); 
  const [characterCount, setCharacterCount] = useState(0); 

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

  function convertStringToByteArray(str) {                                                                                                                                      
    var bytes = [];                                                                                                                                                             
    for (var i = 0; i < str.length; ++i) {                                                                                                                                      
      bytes.push(str.charCodeAt(i));                                                                                                                                            
    }                                                                                                                                                                           
    return bytes                                                                                                                                                                
  }
  

  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <View style={{marginBottom: 10, flexDirection: 'row'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Write a cast</Text>
      </View>

      <TextInput
        multiline={true}
        numberOfLines={9}
        style={{ height: '50%', width: '90%', paddingTop: 15, fontSize: 18, padding: 10, backgroundColor: '#8193F5', borderColor: 'gray', borderRadius: 10, borderWidth: 1}}
        onChangeText={(text) => {
          setCastText(text); 
          const byteLength = convertStringToByteArray(text).length
          setCharacterCount(byteLength);
        }}
        value={castText}
      />
      
      <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'flex-end'}}>
        <Text style={{fontSize: 16}}>{characterCount}/320 bytes</Text>
      </View>
      <Text style={{fontSize: 20, color: 'red', textAlign: 'center'}}>{error}</Text>
      
      <TouchableOpacity onPress={() => submitCast()} style={{backgroundColor: 'green', padding: 20, borderRadius: 50, paddingLeft: 50, paddingRight: 50}}>
        <Text style={{fontSize: 20}}>Send</Text>
      </TouchableOpacity>
    </SafeAreaView>
 );
}
