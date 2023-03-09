import { Buffer } from 'buffer';
import 'react-native-url-polyfill/auto';
import '@azure/core-asynciterator-polyfill'
global.Buffer = Buffer;
import "@ethersproject/shims"
import * as SplashScreen from 'expo-splash-screen';
import WalletContextProvider from './context/WalletContext';
import Pages from './pages/Index';

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <WalletContextProvider>
      <Pages />
    </WalletContextProvider>
  );
}
