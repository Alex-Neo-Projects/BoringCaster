import { StyleSheet, Text, Animated, Image, RefreshControl, View, FlatList, ActivityIndicator, Button, Pressable, TouchableOpacity } from 'react-native';
import { MerkleAPIClient } from "@standard-crypto/farcaster-js";
import { useContext, useEffect, useState } from 'react';
import FloatingActionButton from '../components/FloatingActionButton';
import { WalletContext } from '../context/WalletContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const { wallet } = useContext(WalletContext);

  const [castData, setCastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const [showPopup, setShowPopup] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
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
  }, []);

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
      <View style={{flex: 1, padding: 20, flexDirection: 'row', borderColor: 'black', borderWidth: 2, margin: 10, marginBottom: 5, borderRadius: 10}}>
        <View style={{flex: 1}}>
          <Image
            style={{height: 50, width: 50, borderRadius: 20}}
            source={{uri: cast.author.pfp.url}}
          />
        </View>

        <View style={{flex: 5}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 14, paddingBottom: 6, flex: 1}}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>{cast.author.displayName}</Text> <Text style={{color: '#373737', fontSize: 17}}>@{cast.author.username}</Text>
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 18}}>{cast.text}</Text>
          </View>
        </View>
      </View>
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
