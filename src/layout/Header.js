import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
    createStyles,
    createMuiTheme,
    makeStyles,
    Theme,
    ThemeProvider
} from '@material-ui/core/styles';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {ButtonBase} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom'
import {ExitToApp, Home, TrendingUpRounded} from '@material-ui/icons';

import logo from '../assets/img/ofppt.logo.png'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
        backgroundColor:"#333333",
    },
    avatar: {
        margin: 5,
        width: 35,
        height: 35,
    },
    title: {
        flexGrow: 1,
    },
    margin: {
        marginLeft: theme.spacing(3)
    },
  }),
);


const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() =>{
      setTimeout(() => {
        if(localStorage.user) {
          setIsAuthenticated(true)
        }
        else{
          setIsAuthenticated(false)
        }
      }, 1000);
      
    }, [isAuthenticated])
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const logout = () => {
        setOpen(false)
        localStorage.clear()
    }
    const classes = useStyles();
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)
    return (
      setTimeout(() => {
        if(localStorage.user) {
          setIsAuthenticated(true)
        }
        else{
          setIsAuthenticated(false)
        }
        return true
      }, 1000) &&
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Grid container justify="flex-start" alignItems="center" className={classes.title}>
              <Avatar alt="Transport Alarm" src={logo} className={classes.avatar}  component={AdapterLink} to="/"/>
              <Typography variant="h6">
                Gestion des dossiers des enseignants vacataires
              </Typography>
          </Grid>
          {/* {
            !isAuthenticated
            &&
            <ButtonBase variant="contained" color="inherit" component={AdapterLink} to="/signin">
            <ExitToApp/>
          </ButtonBase>
          }
          {
            isAuthenticated
            &&
            <ButtonBase variant="contained" color="inherit" component={AdapterLink} to="/dashboard">
              <Home/>
            </ButtonBase>
          }
          {
            isAuthenticated
            &&
            <ButtonBase variant="contained" color="inherit" onClick={handleClickOpen} className={classes.margin}>
              <ExitToApp/>
            </ButtonBase>
          }
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Fermez l'application"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              Vous souhaitez vous déconnecter?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={logout} color="primary" component={AdapterLink} to="/">
                Oui
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Non
              </Button>
            </DialogActions>
          </Dialog> */}
        </Toolbar>
      </AppBar>
    )
}

export default Header