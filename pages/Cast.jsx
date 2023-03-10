import { TextInput, ActivityIndicator, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { WalletContext } from '../context/WalletContext';
import { useContext, useState } from 'react';
import { publishCast } from "@standard-crypto/farcaster-js";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export function Cast() {
  const { wallet } = useContext(WalletContext);
  const [castText, setCastText] = useState('');
  const [error, setError] = useState(''); 
  const [characterCount, setCharacterCount] = useState(0); 
  const [loading, setLoading] = useState();

  const placeHolderOptions = ['Cast your mind', 'Cast away!', "what's poppin", 'Speak up !', "What's on your mind?", 'Cast your thoughts away', "What's happening?"]

  const navigation = useNavigation();

  async function submitCast() { 
    try {
      setError('');
      setLoading(true);

      await publishCast(wallet, castText);

      setLoading(false);
      navigation.navigate('Home', {'castSent': "true"})
    } catch (e) { 
      setLoading(false);
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
    <SafeAreaView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{padding: 10, marginLeft: 10}}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>

            <Text style={{fontSize: 25, paddingRight: 60, fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Write a cast</Text>
          </View>

          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
              <TextInput
                multiline={true}
                numberOfLines={8}
                placeholder={placeHolderOptions[Math.floor(Math.random() * placeHolderOptions.length)]}
                style={{ height: '70%', width: '90%', paddingTop: 15, paddingLeft: 15, paddingRight: 15, fontSize: 18, borderColor: 'gray', borderRadius: 10, borderWidth: 2}}
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
            </View>
            
            {loading ? (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <View style={{ flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: 'red', textAlign: 'center'}}>{error}</Text>
                
                <TouchableOpacity onPress={() => submitCast()} style={{backgroundColor: 'black', padding: 20, borderRadius: 50, paddingLeft: 50, paddingRight: 50}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Send</Text>
                </TouchableOpacity>
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
 );
}
