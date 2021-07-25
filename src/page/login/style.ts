import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  loginContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 20,
    padding: 20,
  },
  mainHeader: {
    fontSize: 36,
    // marginBottom: 50,
  },
  tabContainer: {
    margin: 40,
  },
});
