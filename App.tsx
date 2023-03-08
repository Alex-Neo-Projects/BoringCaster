import { Buffer } from 'buffer';
import 'react-native-url-polyfill/auto';
import '@azure/core-asynciterator-polyfill'
global.Buffer = Buffer;
import "@ethersproject/shims"
import { EnterMnemonic } from './pages/EnterMnemonic';
import { Home } from './pages/Home';
import { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [mnemonic, setMnemonic] = useState<string | null>();
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    async function getValueFromStorage() {
      try {
        const retrievedValue = await SecureStore.getItemAsync('mnemonic');
        setMnemonic(retrievedValue);
        setSignedIn(retrievedValue ? true : false);

        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 500);
      } catch (error) {
        console.log('Error retrieving value from storage:', error);
      }
    };
    getValueFromStorage();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { mnemonic && isSignedIn ? (
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        ) : (
          <Stack.Screen name="EnterMnemonic" options={{headerShown: false}}>
            {() => <EnterMnemonic />}
          </Stack.Screen> 
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

