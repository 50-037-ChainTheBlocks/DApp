import { useState } from 'react';
import { Button, Box, TextField, Typography } from '@material-ui/core';
import { useStyles } from './style';

const InputBox = (props: any) => {
  const { input, setInput, label, type } = props;
  const classes = useStyles();
  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <Box>
      <TextField
        label={label !== undefined ? label : ''}
        variant="outlined"
        onChange={onChangeHandler}
        type={type !== undefined ? type : ''}
      ></TextField>
    </Box>
  );
};

export { InputBox };
