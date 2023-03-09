import { SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import { WalletContext } from "../context/WalletContext";

export function Settings() {
  const { updateState } = useContext(WalletContext);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  async function signOut() { 
    try { 
      // Clear prev error state
      setError('');
      setLoading(true);

      await SecureStore.deleteItemAsync('mnemonic');

      setLoading(false);

      updateState();
    } catch (e) {
      setError(e.toString());
    }
  }

  return ( 
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{padding: 10, marginLeft: 10}}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>

        <Text style={{fontSize: 25, paddingRight: 60, fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Settings</Text>
      </View>

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 100}}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 30}}>
          <TouchableOpacity onPress={() => signOut()} style={{backgroundColor: 'black', width: 150, height: 70, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Sign out</Text>
          </TouchableOpacity>

          <Text style={{fontSize: 20, paddingTop: 20, color: 'red', textAlign: 'center'}}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
 );
}
