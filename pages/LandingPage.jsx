import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BoringButton } from "../components/BoringButton";

export function LandingPage() {
  const navigation = useNavigation();

  return ( 
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 4, alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
        <View style={{flex: 2}}>
          <Text style={{fontSize: 50, fontWeight: 'bold', paddingTop: 30}}>Welcome to BoringCaster.</Text>
        </View>

        <View style={{flex: 2}}>
          <Text style={{fontSize: 25, fontWeight: '600', textAlign: 'center'}}>BoringCaster is a Farcaster client</Text>
          <Text style={{fontSize: 20, textAlign: 'center', paddingTop: 20}}>Without algo feeds, likes, or notifications.</Text>
          <Text style={{fontSize: 20, textAlign: 'center', paddingTop: 15}}>It's just you, and your desire to put ideas out into the world</Text>
        </View>
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <BoringButton onPress={() => navigation.navigate('SecretKeyDisclaimer')} innerText={'Sign into Farcaster'} />
      </View>
    </SafeAreaView>
 );
}
