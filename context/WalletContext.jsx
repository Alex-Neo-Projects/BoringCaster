import React, { createContext, useEffect, useState } from 'react';
import { Wallet } from "ethers";
import * as SecureStore from 'expo-secure-store';

export const WalletContext = createContext();

const WalletContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getMnemonic() { 
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

    getMnemonic();
  }, [])

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
    updateState
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
