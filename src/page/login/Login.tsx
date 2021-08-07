import { useState } from 'react';
import { Button, Box, Tab, Tabs, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useStyles } from './style';
import { InputBox } from '../../component/InputBox';
import { TabPanel } from '../../component/TabPanel';

const Login: Function = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const submitButtonHandler = (e: any) => {
    e.preventDefault();
    if (username == null || password == null) {
      setShowAlert(true);
    }
  };
  const classes = useStyles();
  const changeTabValueHandler = (e: any, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.loginContainer}>
        <Box className={classes.mainHeader}>
          <Typography variant="h5">Login Page</Typography>
        </Box>
        <Tabs
          className={classes.tabContainer}
          value={tabValue}
          onChange={changeTabValueHandler}
          aria-label="simple tabs example"
        >
          <Tab label="Student" />
          <Tab label="University" />
          <Tab label="Institution" />
        </Tabs>
        <TabPanel value={tabValue} index={0}></TabPanel>
        <InputBox
          input={username}
          setInput={setUsername}
          label="Username"
        ></InputBox>
        <InputBox
          input={password}
          setInput={setPassword}
          label="Password"
          type="password"
        ></InputBox>
        {showAlert ? <Alert severity="error">Empty input field!</Alert> : null}
        <Button
          variant="contained"
          color="primary"
          onClick={submitButtonHandler}
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export { Login };
