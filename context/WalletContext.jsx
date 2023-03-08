import React, { createContext, useEffect, useState } from 'react';
import { Wallet } from "ethers";
import * as SecureStore from 'expo-secure-store';

export const WalletContext = createContext();

const WalletContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState();

  useEffect(() => {
    async function getMnemonic() { 
      const mnemonic = await SecureStore.getItemAsync('mnemonic');
      const tempWallet = Wallet.fromMnemonic(mnemonic);

      setWallet(tempWallet);
    }

    getMnemonic();
  }, [])

  const contextValue = {
    wallet
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
