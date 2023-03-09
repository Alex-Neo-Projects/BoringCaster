import { Text, TextInput, SafeAreaView, Button, TouchableOpacity, View } from 'react-native';
import { useState, useContext } from 'react';
import { Wallet } from "ethers";
import * as SecureStore from 'expo-secure-store';
import { WalletContext } from '../context/WalletContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export function EnterMnemonic() {
  const [secretKey, onChangeSecretKey] = useState('');
  const [error, setError] = useState<string>(); 
  const [doneSaving, setDoneSaving] = useState(false);
  const { updateState } = useContext(WalletContext);

  const navigation = useNavigation();

  async function saveSecretKey() { 
    try { 
      // Clear prev error state
      setError('');

      Wallet.fromMnemonic(secretKey);
      SecureStore.setItemAsync('mnemonic', secretKey);

      setDoneSaving(true);

      updateState();
    } catch (e) {
      setError(e.toString());
    }
  }

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 30}}>
        <TouchableOpacity onPress={() => navigation.navigate('SecretKeyDisclaimer')} style={{padding: 10, marginLeft: 10}}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>

        <Text style={{fontSize: 25, paddingRight: 50, fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Enter your secret key</Text>
      </View>

      <TextInput
        multiline={true}
        numberOfLines={9}
        style={{ height: '30%', width: '90%', paddingTop: 15, paddingLeft: 15, paddingRight: 15, fontSize: 18, borderColor: 'gray', borderRadius: 10, borderWidth: 1}}
        onChangeText={onChangeSecretKey}
        value={secretKey}
        placeholder={'cast blog zero ...'}
      />

      <Text style={{fontSize: 25, color: 'red', paddingTop: 20, paddingBottom: 20}}>{error}</Text>
      {doneSaving ? (
        <Text style={{fontSize: 25, paddingBottom: 30, textAlign: 'center'}}>Loading...</Text>
      ) : (
        <TouchableOpacity onPress={() => saveSecretKey()} style={{padding: 20, backgroundColor: 'black', borderRadius: 30, paddingLeft: 40, paddingRight: 40}}>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Submit</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
 );
}
