import { useEffect, useState } from 'react';
import { Button, Box, Tab, Tabs, Typography } from '@material-ui/core';
import Web3 from 'web3';
import { contract, web3 } from '../../services/contract/web3';
import { abi, contractAddress } from '../../services/contract/config'
import { AbiItem } from 'web3-utils';
import { Certificate } from '../../param/certificate';

const Student: Function = () => {    
    const [accountAddress, setAccountAddress] = useState<string | null> (null); 
    const [certificateList, setCertificateList] = useState<Certificate[]> ([]);

    useEffect(() => {        
        setAccountAddress("0x6D18286412a443CfC95d90fBB0D2F81c54455948")
        console.log(web3.eth.getAccounts(console.log))
        web3.eth.defaultAccount = "0x6D18286412a443CfC95d90fBB0D2F81c54455948"
        contract.methods.getAllMyCertificates().call({from: accountAddress}, (err:any, res:any) => res).then((res:any) => console.log(res));
    }, [])

    return (
        <Box>
            <Typography>Student Main Page</Typography>
            <Typography>{accountAddress}</Typography>
        </Box>
    )
}

export {Student}