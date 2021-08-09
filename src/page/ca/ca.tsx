import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import debounce from 'lodash/debounce';
import { useContract, useWeb3 } from '@services/contract/web3';
import { useMetamask, getAddressFromMetamask } from '@services/metamask';
import { IssuedCertificate } from '@param/issuedCertificate';

import { soliditySha3 } from  "web3-utils";
const FORM_FIELDS = [
  {
    name: 'institutionAddress',
    label: 'Institution Address',
  },
  {
    name: 'institutionName',
    label: 'Institution Name',
  }
];

const CA: Function = () => {
  const [response, setResponse] = useState({
      isShown: false,
      isRegistered: false
  });
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [showVerify, setShowVerify] = useState(false);
  const web3Ref = useWeb3();
  const contractRef = useContract(web3Ref.current);
  const [loading, setLoading] = useState(false);

  const [institution, setInstitution] = useState<any>({
    institutionName: '',
    institutionAddress: '',
  });

  const inputChangeHandler = (evt: any) => {
    const value = evt.target.value;
    setInstitution({
      ...institution,
      [evt.target.name]: value,
    });
    setResponse({
        isShown: false,
        isRegistered: false
    });
  };

  const registerInstitution = async () => {
    if (Object.values(institution).some((i) => i === '')) return;
    setLoading(true);
    
    const result: string = await contractRef.current.methods
      .registerInstitution(
      institution.institutionAddr, 
      institution.institutionName
    ).call();
    // setCertificateList(results);
    result == "success" ? setResponse({isShown:true, isRegistered: true}) : setResponse({isShown:true, isRegistered: false}) 
    setLoading(false);
  };

  return (
    <Box style={{ alignContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" style={{ margin: '16px 0px' }}>
        Institution Main Page
      </Typography>
      <Typography variant="h6" style={{ margin: '16px 0px' }}>
        Verify Certificate
      </Typography>
      <Box
        mb={6}
        style={{ flexDirection: 'column', width: '50%', margin: 'auto' }}
      >
        {FORM_FIELDS.map(({ name, label }) => {
          return (
            <TextField
              name={name}
              label={label}
              variant="outlined"
              fullWidth
              onChange={inputChangeHandler}
              key={name}
              style={{ marginBottom: '0.75rem' }}
            />
          );
        })}
      </Box>
      {response.isShown && (
        <Box mb={2} width="50%" mx="auto">
          {response.isRegistered ? (
            <Alert severity="success">Verified!</Alert>
          ) : (
            <Alert severity="error">Not Verified!</Alert>
          )}
        </Box>
      )}
      <Box mb={2} style={{ position: 'relative' }}>
        <Button
          onClick={registerInstitution}
          color="secondary"
          variant="contained"
          disabled={loading}
        >
          Register
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: '-12px',
              marginTop: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export { CA };
