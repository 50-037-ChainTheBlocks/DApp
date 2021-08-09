import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  Badge,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContract, useWeb3 } from '@services/contract/web3';
import {
  useMetamask,
  getAddressFromMetamask,
  getChainType,
} from '@services/metamask';

const FORM_FIELDS = [
  {
    name: 'institutionAddress',
    label: 'Institution Address',
  },
  {
    name: 'institutionName',
    label: 'Institution Name',
  },
];

const CA: React.FC = () => {
  const [response, setResponse] = useState({
    isShown: false,
    isRegistered: false,
  });
  const web3Ref = useWeb3();
  const contractRef = useContract(web3Ref.current);
  const [loading, setLoading] = useState(false);

  const [institution, setInstitution] = useState({
    institutionName: '',
    institutionAddress: '',
  });
  const [metamaskEnabled, metamaskConnect] = useMetamask(web3Ref.current);
  const [accountAddress, setAccountAddress] = useState('');

  const [networkType, setNetworkType] = useState('');

  const setAddressFromMetamask = async () => {
    const addr = await getAddressFromMetamask();
    setAccountAddress(addr);
    setNetworkType(await getChainType());
  };

  const inputChangeHandler = (evt: any) => {
    const value = evt.target.value;
    setInstitution({
      ...institution,
      [evt.target.name]: value,
    });
    setResponse({
      isShown: false,
      isRegistered: false,
    });
  };

  const registerInstitution = async () => {
    if (Object.values(institution).some((i) => i === '')) return;
    setLoading(true);

    web3Ref.current.eth.defaultAccount = accountAddress;
    contractRef.current.defaultAccount = accountAddress;

    try {
      const result = await contractRef.current.methods
        .registerInstitution(
          institution.institutionAddress,
          institution.institutionName
        )
        .send({ from: accountAddress, gas: 3000000 });
      console.log(result);
      if ('status' in result && result.status) {
        setResponse({ isShown: true, isRegistered: true });
      } else {
        setResponse({ isShown: true, isRegistered: false });
      }
    } catch (err) {
      console.error(err);
      setResponse({ isShown: true, isRegistered: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ alignContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" style={{ margin: '16px 0px' }}>
        Admin Main Page
      </Typography>

      <Badge
        badgeContent={networkType === '' ? 0 : networkType}
        color="secondary"
      >
        <TextField
          label="Wallet Address"
          placeholder="Get address from Metamask"
          value={accountAddress}
          InputProps={{ readOnly: true }}
          variant="outlined"
          fullWidth
          style={{ width: '500px', marginBottom: '16px' }}
        />
      </Badge>
      <Box mb={4}>
        <Box mb={1}>
          <Button
            onClick={() => {
              metamaskConnect();
              setAddressFromMetamask();
            }}
            color="secondary"
            variant="contained"
          >
            Use Metamask
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" style={{ margin: '16px 0px' }}>
        Register Institution
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
              disabled={loading}
            />
          );
        })}
      </Box>
      {response.isShown && (
        <Box mb={2} width="50%" mx="auto">
          {response.isRegistered ? (
            <Alert severity="success">
              {institution.institutionName} has been registered successfully!
            </Alert>
          ) : (
            <Alert severity="error">
              There seems to be an error. Could not register{' '}
              {institution.institutionName}!
            </Alert>
          )}
        </Box>
      )}
      <Box mb={2} style={{ position: 'relative' }}>
        <Button
          onClick={registerInstitution}
          color="primary"
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
