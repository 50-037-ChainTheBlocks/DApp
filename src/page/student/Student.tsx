import { useEffect, useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import grey from '@material-ui/core/colors/grey';
import { useContract, useWeb3 } from '../../services/contract/web3';
import { Certificate } from '../../param/certificate';

const Student: Function = () => {
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const web3Ref = useWeb3();
  const contractRef = useContract(web3Ref.current);

  const metamaskConnect = async () => {
    if ((window as any).ethereum === undefined) {
      console.error('METAMASK IS NOT INSTALLED');
      return;
    }
    const [account]: string[] = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    web3Ref.current.eth.defaultAccount = account;
    setAccountAddress(account);
    (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length) setAccountAddress(accounts[0]);
    });
  };
  // useEffect(() => {
  // setAccountAddress('0x6D18286412a443CfC95d90fBB0D2F81c54455948');
  // console.log(web3.eth.getAccounts(console.log));
  // web3.eth.defaultAccount = '0x6D18286412a443CfC95d90fBB0D2F81c54455948';
  // contract.methods
  //   .getAllMyCertificates()
  //   .call({ from: accountAddress }, (err: any, res: any) => res)
  //   .then((res: any) => console.log(res));
  // }, []);

  const getAllMyCertificates = async () => {
    const results: Certificate[] = await contractRef.current.methods
      .getAllMyCertificates()
      .call({ from: accountAddress });
    setCertificateList(results);
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography>Student Main Page</Typography>
        <Typography>{accountAddress}</Typography>
      </Box>
      <Box mb={6}>
        <Box mb={1}>
          <Button
            onClick={metamaskConnect}
            color="secondary"
            variant="contained"
          >
            Connect To Metamask
          </Button>
        </Box>
        <Box>
          <Button
            onClick={getAllMyCertificates}
            color="primary"
            variant="contained"
          >
            Get My Certificates
          </Button>
        </Box>
      </Box>
      <Typography variant="h4">Certificates</Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          bgcolor={grey[200]}
          height={400}
          width={800}
          p={2}
          borderRadius={8}
        >
          {certificateList.map((cert, i) => {
            return (
              <Box m={0.5} key={i} style={{ width: '250px' }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary">{cert.course}</Typography>
                    <Typography variant="h4">{cert.degree}</Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Typography variant="body2" color="textSecondary">
                        {cert.institutionName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {cert.enrolledYear}-{cert.graduatingYear || 2021}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export { Student };
