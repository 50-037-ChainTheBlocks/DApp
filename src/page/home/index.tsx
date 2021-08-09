import React, { useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { TabPanel } from '@component/TabPanel';
import { Institution } from '@page/institution/Institution';
import { University } from '@page/university/University';
import { CA } from '@page/ca/ca';

const Home: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const changeTabValueHandler = (e: any, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return (
    <Box display="flex">
      <Paper elevation={3}>
        <Tabs
          value={tabValue}
          onChange={changeTabValueHandler}
          orientation="vertical"
          aria-label="simple tabs example"
          style={{ flexShrink: 0 }}
          centered
        >
          <Tab label="Admin" />
          <Tab label="Institution" />
          <Tab label="Verification" />
        </Tabs>
      </Paper>
      <TabPanel value={tabValue} index={0}>
        <CA />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <University />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Institution />
      </TabPanel>
    </Box>
  );
};

export { Home };
