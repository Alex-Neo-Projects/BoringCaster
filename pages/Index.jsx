import { EnterMnemonic } from './EnterMnemonic';
import { Home } from './Home';
import { useContext } from 'react';
import { SecretKeyDisclaimer } from './SecretKeyDisclaimer';
import { Cast } from './Cast';
import { Settings } from './Settings';
import { WalletContext } from '../context/WalletContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { LandingPage } from './LandingPage';

const Stack = createNativeStackNavigator();

export default function Pages() {
  const { wallet, isLoading } = useContext(WalletContext);

  if (!isLoading) { 
   setTimeout(() => {
     SplashScreen.hideAsync();
   }, 500);
  }

  return ( 
    <NavigationContainer>
      <Stack.Navigator>
          { wallet  ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
              <Stack.Screen name="Cast" component={Cast} options={{headerShown: false}}/>
              <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
            </>
          ) : (
            <>
              <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown: false}} />
              <Stack.Screen name="SecretKeyDisclaimer" component={SecretKeyDisclaimer} options={{headerShown: false}} /> 
              <Stack.Screen name="EnterMnemonic" component={EnterMnemonic} options={{headerShown: false}} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
 );
}
