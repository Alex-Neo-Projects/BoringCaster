import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { useContext, useEffect, useState } from 'react';
import FloatingActionButton from '../components/FloatingActionButton';
import { WalletContext } from '../context/WalletContext';

export function Home() {
  const [castData, setCastData] = useState([]);
  const [user, setUser] = useState<any>(''); 
  const [loading, setLoading] = useState(false);
  const { wallet } = useContext(WalletContext);

  async function getData() {
    setLoading(true);
    const client = new MerkleAPIClient(wallet);
    const currentUser = await client.fetchCurrentUser();

    setUser(currentUser);

    let castDataLocal = []; 

    for await (const cast of client.fetchCastsForUser(currentUser)) {
      castDataLocal.push(cast);      
    }
    setCastData(castDataLocal);
    setLoading(false);
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
        {loading ? (
          <ActivityIndicator size={"large"}/>
        ) : (
        <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>{user.displayName}</Text>
          </View>

          <FlatList
            data={castData}
            renderItem={({item}) => <Item castText={item.text} />}
            keyExtractor={item => item.hash}
          />
        </View>
        )}
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
