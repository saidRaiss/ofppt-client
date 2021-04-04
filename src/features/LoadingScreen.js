import React from 'react';
import {Grid} from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/img/ofppt.logo.png';
const useStyles = makeStyles(theme => ({
  spinner: {
    left: 0,
    right: 0,
    margin: 'auto'
  },
  logoImg: {
    left: 0,
    right: 0,
    margin: 'auto',
    width:150,
    height:'auto'
  },
  container: {
    minHeight:'100vh',
  },
  gridItemImg: {
    marginTop: '30vh',
    marginBottom: 50,
  },
}));
const theme = createMuiTheme({
    palette: {
        primary: {
        main: "#333333"
        }
    }
});
export default function LoadingScreen() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <Grid container 
         direction="column"
         justify="center"
         alignItems="center"
        >
          <Grid item xs md className={classes.gridItemImg}>
              <img src={logo} alt='Alarm Transport'className={classes.logoImg} />
          </Grid>
          <Grid item md>
            <MuiThemeProvider theme={theme}>
                <CircularProgress color="primary" size={50}  className={classes.spinner}/>
            </MuiThemeProvider>
          </Grid>
        </Grid>
    </div>
  );
}
