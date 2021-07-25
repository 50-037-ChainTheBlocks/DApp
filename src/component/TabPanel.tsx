import { useState } from 'react';
import {
  Button,
  Box,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import { useStyles } from './style';

export const TabPanel = (props: any) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index ? children : null}
    </div>
  );
};
