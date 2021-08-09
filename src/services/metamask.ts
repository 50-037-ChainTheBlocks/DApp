import { useState } from 'react';
import Web3 from 'web3';

const getAddressFromMetamask = async () => {
  const [account]: string[] = await (window as any).ethereum.request({
    method: 'eth_requestAccounts',
  });
  return account;
};

const getChainType = async () => {
  const chainId = parseInt(
    await (window as any).ethereum.request({
      method: 'eth_chainId',
    })
  );
  switch (chainId) {
    case 1:
      return 'Mainnet';
    case 3:
      return 'Ropsten';
    case 4:
      return 'Rinkeby';
    case 5:
      return 'Goerli';
    case 42:
      return 'Kovan';
    default:
      return 'Unknown';
  }
};

const useMetamask = (web3: Web3): [boolean, () => void] => {
  const [metamaskEnabled, setMetamaskEnabled] = useState(false);
  const metamaskConnect = () => {
    if ((window as any).ethereum === undefined) {
      console.error('METAMASK IS NOT INSTALLED');
      return;
    }
    if (metamaskEnabled) {
      return;
    }
    setMetamaskEnabled(true);
    web3.setProvider((window as any).ethereum);
  };
  return [metamaskEnabled, metamaskConnect];
};

export { getAddressFromMetamask, useMetamask, getChainType };
