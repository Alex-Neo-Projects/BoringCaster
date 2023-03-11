import { StyleSheet, Text, Animated, Image, RefreshControl, View, FlatList, ActivityIndicator, Button, Pressable, TouchableOpacity } from 'react-native';
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { useContext, useEffect, useState } from 'react';
import FloatingActionButton from '../components/FloatingActionButton';
import { WalletContext } from '../context/WalletContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import CastCard from '../components/CastCard';

export function Home() {
  const { wallet } = useContext(WalletContext);

  const [castData, setCastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const [showPopup, setShowPopup] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (route && route.params && ('castSent' in route.params)) { 
      setShowPopup(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
  
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setShowPopup(false);
        });
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [route, navigation]);

  async function getData() {
    const client = new MerkleAPIClient(wallet);
    const currentUser = await client.fetchCurrentUser();

    let castDataLocal = [];

    for await (const cast of client.fetchCastsForUser(currentUser)) {
      castDataLocal.push(cast);      
    }

    setCastData(castDataLocal);
    setLoading(false);
  }

  const handleRefresh = () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  };

  const Item = ({cast}) => {
    return (
      <CastCard cast={cast}/>
    )
  };

  useEffect(() => {
    setLoading(true);
    getData()
  }, [])

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
        <StatusBar barStyle = "dark-content" hidden = {false} />

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2}}>
          <Text style={{fontSize: 25, marginLeft: 50, fontWeight: 'bold', flex: 1, textAlign: 'center'}}>BoringCaster</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{padding: 10}}>
            <Feather name="settings" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {showPopup && (
          <Animated.View style={{ opacity, bottom: 60, position: 'absolute', zIndex: 1, left: '25%', borderRadius: 20, backgroundColor: 'black', width: '50%', justifyContent: 'center', height: 70 }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Cast sent!</Text>
          </Animated.View>
        )}

        {loading ? (
          <View style={{flex: 1, paddingBottom: 100, justifyContent: 'center', alignContent: 'center'}}>
            <ActivityIndicator size={"large"}/>
          </View>
        ) : (
        <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>

          <FlatList
            data={castData}
            renderItem={({item}) => <Item cast={item} />}
            keyExtractor={item => item.hash}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          />

          <FloatingActionButton />
        </View>
        )}
      </SafeAreaView>
    </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
