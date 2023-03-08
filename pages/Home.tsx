import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { Wallet } from "ethers";
import { useEffect, useState } from 'react';
import FloatingActionButton from '../components/FloatingActionButton';
import * as SecureStore from 'expo-secure-store';

export function Home() {
  const [castData, setCastData] = useState([]);
  const [user, setUser] = useState<any>(''); 
  
  async function getData() {
    const mnemonic = await SecureStore.getItemAsync('mnemonic')
    const wallet = Wallet.fromMnemonic(mnemonic);
    const client = new MerkleAPIClient(wallet);
    const currentUser = await client.fetchCurrentUser();

    setUser(currentUser);

    let castDataLocal = []; 

    for await (const cast of client.fetchCastsForUser(currentUser)) {
      castDataLocal.push(cast);      
    }
    setCastData(castDataLocal);
  }

  const Item = ({castText}) => (
    <View style={{padding: 20, backgroundColor: '#8193F5', margin: 10, marginBottom: 5, borderRadius: 10}}>
      <Text style={{fontSize: 16}}>{castText}</Text>
    </View>
  );

  useEffect(() => {
    getData()
  }, [])

  return ( 
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 20}}>{user.displayName}</Text>
        </View>
        <FlatList
          data={castData}
          renderItem={({item}) => <Item castText={item.text} />}
          keyExtractor={item => item.hash}
        />
      </SafeAreaView>
      <FloatingActionButton />
    </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
