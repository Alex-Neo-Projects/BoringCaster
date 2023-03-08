import { Text, TextInput, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Wallet } from "ethers";
import * as SecureStore from 'expo-secure-store';

export function EnterMnemonic() {
  const [secretKey, onChangeSecretKey] = useState('');
  const [error, setError] = useState<string>(); 
  const [doneSaving, setDoneSaving] = useState(false);

  async function saveSecretKey() { 
    try { 
      // Clear prev error state
      setError('');

      Wallet.fromMnemonic(secretKey);
      SecureStore.setItemAsync('mnemonic', secretKey);

      setDoneSaving(true);
    } catch (e) {
      setError(e.toString());
    }
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30, paddingBottom: 30}}>Enter your farcaster secret key:</Text>
      <TextInput 
        style={{ height: 40, width: '90%', margin: 12, borderColor: 'gray', borderRadius: 10, borderWidth: 1, padding: 10}}
        onChangeText={onChangeSecretKey}
        value={secretKey}
        placeholder={'cast blog zero ...'}
      />

      <Text style={{fontSize: 20, color: 'red'}}>{error}</Text>
      {doneSaving ? (
        <Text style={{fontSize: 25, paddingBottom: 30, textAlign: 'center'}}>Done saving! Plz reload the app to see the home screen.</Text>
      ) : (
        <Button title='Submit' onPress={() => saveSecretKey()}/>
      )}
    </SafeAreaView>
 );
}
