import React, { createContext, useEffect, useState } from 'react';
import { Wallet } from "ethers";
import * as SecureStore from 'expo-secure-store';

export const WalletContext = createContext();

const WalletContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      signIn().catch(async (e) => {
        await SecureStore.deleteItemAsync('mnemonic');
        setWallet();
      });
    } catch (e) { 
      deleteMnemonicFromStorage();
    }
  }, [])

  async function deleteMnemonicFromStorage() { 
    await SecureStore.deleteItemAsync('mnemonic');
  }

  async function signIn() {
    const mnemonic = await SecureStore.getItemAsync('mnemonic');
      
    if (!mnemonic) {
      setWallet();
      setLoading(false);
      throw new Error('Invalid key. Received empty string')
    }

    const tempWallet = Wallet.fromMnemonic(mnemonic);
    console.log('temp wallet: ', tempWallet)

    setWallet(tempWallet);
    setLoading(false);
  }

  async function updateState() {
    const mnemonic = await SecureStore.getItemAsync('mnemonic');

    if (!mnemonic) {
      setWallet();
      setLoading(false);
      return;
    }

    const tempWallet = Wallet.fromMnemonic(mnemonic);

    setWallet(tempWallet);
    setLoading(false);
  }

  const contextValue = {
    wallet, 
    isLoading,
    updateState,
    signIn
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
