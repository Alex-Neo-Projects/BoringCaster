import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BoringButton } from '../components/BoringButton';

export function SecretKeyDisclaimer() {
  const navigation = useNavigation();

  return ( 
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 4}}>
        <View style={{flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('LandingPage')} style={{padding: 10, marginLeft: 10}}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', paddingTop: 30, textAlign: 'left'}}>Next you'll be asked to enter your Farcaster secret key</Text>
          </View>

          <View style={{flex: 4}}>
            <Text style={{fontSize: 25, fontWeight: '500', paddingTop: 30, textAlign: 'left'}}>Some things to note: </Text>
            <Text style={{fontSize: 20, paddingTop: 30, textAlign: 'left'}}>- Your secret key never leaves your device</Text>
            <Text style={{fontSize: 20, paddingTop: 30, textAlign: 'left'}}>- Your secret key is stored in your device's encrypted storage</Text>
            <Text style={{fontSize: 20, paddingTop: 30, textAlign: 'left'}}>- BoringCaster is open source. Feel free to audit the above points.</Text>
          </View>
        </View>
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <BoringButton widthSize={200} innerText={'continue'} onPress={() => navigation.navigate('EnterMnemonic')}></BoringButton>
      </View>
    </SafeAreaView>
 );
}
