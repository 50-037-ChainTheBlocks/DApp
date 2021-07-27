import { useEffect, useState, useCallback } from 'react';
import {
  Tab,
  Tabs,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import debounce from 'lodash/debounce';
import { useContract, useWeb3 } from '@services/contract/web3';
import { getAddressFromMetamask, useMetamask } from '@services/metamask';
import { Certificate } from '@param/certificate';
import { IssuedCertificate } from '@param/issuedCertificate';

const Student: Function = () => {
  const [accountAddress, setAccountAddress] = useState('');
  const [error, setError] = useState(false);
  const [certificateList, setCertificateList] = useState<IssuedCertificate[]>(
    []
  );
  const web3Ref = useWeb3();
  const contractRef = useContract(web3Ref.current);
  const [metamaskEnabled, metamaskConnect] = useMetamask(web3Ref.current);

  const validateAddress = useCallback(
    debounce((addr: string) => {
      setError(!web3Ref.current.utils.isAddress(addr));
    }, 200),
    []
  );
  useEffect(() => {
    if (accountAddress) validateAddress(accountAddress);
  }, [accountAddress, validateAddress]);

  const setAddressFromMetamask = async () => {
    const addr = await getAddressFromMetamask();
    setAccountAddress(addr);
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
    if (error) return;
    web3Ref.current.eth.defaultAccount = accountAddress;
    contractRef.current.defaultAccount = accountAddress;
    const results: IssuedCertificate[] = await contractRef.current.methods
      .getAllMyCertificates()
      .call();
    setCertificateList(results);
    console.log(results);
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h4" style={{ margin: '16px 0px' }}>
          Student Main Page
        </Typography>
        <TextField
          label="Wallet Address"
          placeholder="0x5e971afc039cf29738eff1242db39c3bd4a02ce9"
          value={accountAddress}
          error={error}
          helperText={error ? 'Invalid Address' : ''}
          onChange={(e) => {
            setAccountAddress(e.target.value);
          }}
          variant="outlined"
          fullWidth
          style={{ width: '500px' }}
        />
      </Box>
      <Box mb={6}>
        <Box mb={1}>
          <Button
            onClick={metamaskEnabled ? setAddressFromMetamask : metamaskConnect}
            color="secondary"
            variant="contained"
          >
            {metamaskEnabled ? 'Import from Metamask' : 'Use Metamask'}
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
