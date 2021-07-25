import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { abi, contractAddress } from "./config";
import { AbiItem } from 'web3-utils';

const initWeb3 = () => {
    console.log("Init contract");

    const rpcURL = "http://127.0.0.1:7545";
    const web3 = new Web3(rpcURL);
    // contract.methods.("0xe4d1583A0f639F28a5285744BD3b6fa0bF5B7336").call((err:any, result:string) => result).then((res:string) => console.log(res))
    // const getInstitutionName = async () => {
    //     return await contract.methods.getInstitutionName("0xe4d1583A0f639F28a5285744BD3b6fa0bF5B7336").call();
    // }

    return web3;
}

const initContract = (web3:Web3) => {
    const address = "0xb355e41900D5F5fFe87511107eEA2DC1Da6014AF";
    const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

    return contract;
}

const web3 = initWeb3();
const contract = initContract(web3);

export { web3, contract };
