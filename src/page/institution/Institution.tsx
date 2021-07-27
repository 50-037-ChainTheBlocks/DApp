import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { Typography, Button, Box, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import debounce from 'lodash/debounce';
import { useContract, useWeb3 } from '@services/contract/web3';
import { useMetamask, getAddressFromMetamask } from '@services/metamask';
import { IssuedCertificate } from '@param/issuedCertificate';

const Institution: Function = () => {
  const [accountAddress, setAccountAddress] = useState('');
  const [error, setError] = useState(false);
  // const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const web3Ref = useWeb3();
  const contractRef = useContract(web3Ref.current);
  const [metamaskEnabled, metamaskConnect] = useMetamask(web3Ref.current);

  const [certificate, setCertificate] = useState<IssuedCertificate>({
    name: '',
    course: '',
    degree: '',
    graduatingYear: '',
    enrolledYear: '',
    issuer: '',
    recipient: '',
    institutionName: '',
  });

  const validateAddress = useCallback(
    debounce((addr: string) => {
      setError(!web3Ref.current.utils.isAddress(addr));
    }, 200),
    []
  );

  useEffect(() => {
    if (accountAddress) validateAddress(accountAddress);
  }, [accountAddress, validateAddress]);

  const inputChangeHandler = (evt: any) => {
    const value = evt.target.value;
    setCertificate({
      ...certificate,
      [evt.target.name]: value,
    });
    setShowVerify(false);
  };

  const setAddressFromMetamask = async () => {
    const account = await getAddressFromMetamask();
    setAccountAddress(account);
  };

  //   string memory _name,
  //   string memory _course,
  //   string memory _degree,
  //   string memory _institutionName,
  //   uint _gradudatingYear,
  //   uint _enrolledYear,
  //   address _recipient,
  //   address _sender

  const verifyCertificate = async () => {
    if (error) return;
    console.log(certificate);
    web3Ref.current.eth.defaultAccount = accountAddress;
    contractRef.current.defaultAccount = accountAddress;
    const result: boolean = await contractRef.current.methods
      .verifyCertificate(
        certificate.name,
        certificate.course,
        certificate.degree,
        certificate.institutionName,
        certificate.graduatingYear,
        certificate.enrolledYear,
        certificate.recipient,
        certificate.issuer
      )
      .call();
    // setCertificateList(results);
    setIsVerified(result);
    setShowVerify(true);
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
        <TextField
          name="name"
          label="Recipient Name"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
        ></TextField>
        <TextField
          name="course"
          label="Course"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
        ></TextField>
        <TextField
          name="degree"
          label="Degree"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
        ></TextField>
        <TextField
          name="enrolledYear"
          label="Enrolled Year"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
        ></TextField>
        <TextField
          name="graduatingYear"
          label="Graduating Year"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
        ></TextField>
        <TextField
          name="issuer"
          label="Issuer"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
        ></TextField>
        <TextField
          name="recipient"
          label="Recipient"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
        ></TextField>
        <TextField
          name="institutionName"
          label="Institution Name"
          variant="outlined"
          fullWidth
          onChange={inputChangeHandler}
        ></TextField>
      </Box>
      <Box mb={10} style={{ width: '50%', margin: 'auto' }}>
        {showVerify ? (
          isVerified ? (
            <Alert severity="success">Verified!</Alert>
          ) : (
            <Alert severity="error">Not Verified!</Alert>
          )
        ) : null}
      </Box>
      <Box mb={2}>
        <Button
          onClick={verifyCertificate}
          color="secondary"
          variant="contained"
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
};

export { Institution };
