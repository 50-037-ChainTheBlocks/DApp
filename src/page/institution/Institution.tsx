import React, { useState, useRef } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Alert } from '@material-ui/lab';
import { useContract, useWeb3 } from '@services/contract/web3';
import {
  isIssuedCertificate,
  IssuedCertificate,
} from '@param/issuedCertificate';

import { soliditySha3 } from 'web3-utils';
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const inputChangeHandler = (evt: any) => {
    const value = evt.target.value;
    setCertificate({
      ...certificate,
      [evt.target.name]: value,
    });
    setShowVerify(false);
  };

  const importFile = () => {
    fileInputRef.current?.click();
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    const data = JSON.parse(await new Response(file).text());
    if (isIssuedCertificate(data)) setCertificate(data);
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
    // const result = await contractRef.current.methods
    // .issueCertificate(
    //   keccak256(JSON.stringify({
    //     ...certificate,
    //     institutionName: institutionName,
    //     institutionSender: accountAddress
    //   })).toString('hex'),
    //   // certificate.name,
    //   // certificate.course,
    //   // certificate.degree,
    //   // certificate.graduatingYear,
    //   // certificate.enrolledYear,
    //   certificate.recipient
    // )
    // .send({ from: accountAddress, gas: 3000000 });

    const payload = soliditySha3(
      certificate.name,
      certificate.course,
      certificate.degree,
      certificate.institutionName,
      certificate.graduatingYear,
      certificate.enrolledYear,
      certificate.recipient,
      certificate.issuer
    );

    const result: boolean = await contractRef.current.methods
      .verifyCertificate(payload)
      .call();
    // setCertificateList(results);
    setIsVerified(result);
    setShowVerify(true);
    setLoading(false);
  };

  return (
    <Box style={{ alignContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" style={{ margin: '16px 0px' }}>
        Verification Main Page
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
              value={certificate[name as keyof IssuedCertificate]}
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
      <Box>
        <Box style={{ display: 'inline' }} mr={2}>
          <Button
            onClick={importFile}
            color="secondary"
            variant="contained"
            disabled={loading}
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </Box>
        <Box mb={2} style={{ position: 'relative', display: 'inline' }}>
          <Button
            onClick={verifyCertificate}
            color="primary"
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
    </Box>
  );
};

export { Institution };
