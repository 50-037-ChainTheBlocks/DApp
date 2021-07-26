import { useRef } from 'react';
import Web3 from 'web3';
import { abi, contractAddress } from './config';
import { AbiItem } from 'web3-utils';

const useWeb3 = () => {
  const rpcURL = 'http://127.0.0.1:7545';
  const web3 = new Web3(rpcURL);
  const web3Ref = useRef(web3);
  // contract.methods.("0xe4d1583A0f639F28a5285744BD3b6fa0bF5B7336").call((err:any, result:string) => result).then((res:string) => console.log(res))
  // const getInstitutionName = async () => {
  //     return await contract.methods.getInstitutionName("0xe4d1583A0f639F28a5285744BD3b6fa0bF5B7336").call();
  // }

  return web3Ref;
};

const useContract = (web3: Web3) => {
  const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);
  const contractRef = useRef(contract);

  return contractRef;
};

export { useContract, useWeb3 };
