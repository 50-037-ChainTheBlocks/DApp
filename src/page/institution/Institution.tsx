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

const FORM_FIELDS = [
  {
    name: 'name',
    label: 'Recipient Name',
  },
  {
    name: 'course',
    label: 'Course',
  },
  {
    name: 'degree',
    label: 'Degree',
  },
  {
    name: 'enrolledYear',
    label: 'Enrolled Year',
  },
  {
    name: 'graduatingYear',
    label: 'Graduating Year',
  },
  {
    name: 'issuer',
    label: 'Issuer',
  },
  {
    name: 'recipient',
    label: 'Recipient',
  },
  {
    name: 'institutionName',
    label: 'Institution Name',
  },
];

const Institution: Function = () => {
  // const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const web3Ref = useWeb3();
  const contractRef = useContract(web3Ref.current);
  const [loading, setLoading] = useState(false);

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

  const inputChangeHandler = (evt: any) => {
    const value = evt.target.value;
    setCertificate({
      ...certificate,
      [evt.target.name]: value,
    });
    setShowVerify(false);
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
    if (Object.values(certificate).some((i) => i === '')) return;
    setLoading(true);
    console.log(certificate);
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
      {showVerify && (
        <Box mb={2} width="50%" mx="auto">
          {isVerified ? (
            <Alert severity="success">Verified!</Alert>
          ) : (
            <Alert severity="error">Not Verified!</Alert>
          )}
        </Box>
      )}
      <Box mb={2} style={{ position: 'relative' }}>
        <Button
          onClick={verifyCertificate}
          color="secondary"
          variant="contained"
          disabled={loading}
        >
          Verify
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

export { Institution };
