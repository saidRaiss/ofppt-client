import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingScreen from './LoadingScreen';
import {ExitToApp} from '@material-ui/icons';
import {ButtonBase} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Header from "./../layout/Header"

import logo from '../assets/img/ofppt.logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 10,
      minHeight:'100vh',
    },
    avatar: {
      margin: 5,
      width: 35,
      height: 35,
    },
    startBar: {
        flexGrow: 1,
    },
    mdBar: {
        flexGrow: 1,
        backgroundColor: 'rgba(219, 219, 219, 0.7)',
        padding: 5,
        marginBottom: 1
    },
    endBar: {
        flexGrow: 1,
        backgroundColor: 'rgba(219, 219, 219, 0.7)',
    },
    margin: {
        margin: theme.spacing(1),
      },
    paper: {
        width:'100%',
        padding:'2px'
    },
    blueButton: {
        backgroundColor: '#1e88e5',
        borderColor: '#1e88e5',
        color:"#fff",
        '&:hover': {
            backgroundColor: '#1e88e5',
            borderColor: '#1e88e5',
            boxShadow: 'none',
            },
    },
    buttonValide: {
        borderColor: '#00ff00',
        color:"#00ff00",
        borderRadius: '25px',
        marginRight:25,
        '&:hover': {
            borderColor: '#00ff00',
            color:"#00ff00",
            opacity: 0.8
        }
    },
    buttonInvalide: {
        borderColor: '#ff0000',
        color:"#ff0000",
        borderRadius: '25px',
        '&:hover': {
            borderColor: '#ff0000',
            color:"#ff0000",
            opacity: 0.8
        }
    },
    buttonEnAttend: {
        borderColor: '#ff9100',
        color:"#ff9100",
        borderRadius: '25px',
        '&:hover': {
            borderColor: '#ff9100',
            color:"#ff9100",
            opacity: 0.8
        }
    },
    buttonIncomplet: {
        borderColor: '#ffea00',
        color:"#ffea00",
        borderRadius: '25px',
        '&:hover': {
            borderColor: '#ffea00',
            color:"#ffea00",
            opacity: 0.8
        }
    },
    quiter:{
        top : 20,
        borderColor: '#ff0000',
        color:"#ff0000",
        borderRadius: '25px',
        marginRight:5,
        '&:hover': {
            borderColor: '#ff0000',
            color:"#ff0000",
            opacity: 0.8
        }
    },
}))
const UserDashboard = () => {
    const [isLoaded, setIsLoaded] = useState(true);
    const [demandeEtat, setDemandeEtat] = useState();
    const [valide, setValide] = useState(false);
    const [invalide, setInvalide] = useState(false);
    const [enAttend, setEnAttend] = useState(true);
    const [incomplet, setIncomplet] = useState(false);
    const [username, setUsername] = useState("NOM Prénom");
    const [userCurrent, setUserCurrent] = useState();
    const [demande, setDemande] = useState();
    const [open, setOpen] = useState(false);
    const [exited, setExited] = useState(false);
    useEffect(() => {
        console.log("use effect");
        const dataUser = JSON.parse(localStorage.user)
        UserService.getall().then((res) => {
            console.log(res)
            res.forEach(demande => {
                if(demande.email === dataUser.email){
                    localStorage.setItem("user_demande", JSON.stringify(demande));
                    setDemandeEtat(demande.etat)
                    if(demande.etat === "Validée"){
                        setEnAttend(false)
                        setValide(true)
                    }
                    if(demande.etat === "Réfussée"){
                        setEnAttend(false)
                        setInvalide(true)
                    }
                }
            })
        }).catch((err) => {
             console.log(err)
        })
        setUsername(dataUser.firstname.toUpperCase() + " " + dataUser.lastname.toUpperCase())
    }, []);
    // const dataDemande = JSON.parse(localStorage.user_demande)
    const classes = useStyles();
    console.log("current user", userCurrent)
    console.log("demande", demande)
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const logout = () => {
        setOpen(false)
        setExited(true)
        localStorage.clear()
    }
    const HasDemande = () => {
        const dataUser = JSON.parse(localStorage.user)
        const demandeString = UserService.getUserDemande(dataUser.email)
        console.log("demande user", demandeString)
        localStorage.setItem('user_demande', JSON.stringify(demandeString))
        setUsername(dataUser.firstname.toUpperCase() + " " + dataUser.lastname.toUpperCase())
        return true;
    }
    return exited ?(<Redirect to={"/home"}/>):
    (
        localStorage.getItem('user')===null? <Redirect to={"/"}/>:
        <Container component="main" maxWidth="md" className={classes.root}>
            <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container direction="row" justify="space-between" alignItems="center" className={classes.startBar}>
                    <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center">
                            <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                            <Typography variant="h5">
                                <b>Bienvenue</b>{' ' + username}
                            </Typography>
                        </Grid>
                    </Grid>

                    {demandeEtat && <Grid item >
                        <Button variant="outlined" style={{marginLeft:245}}
                        className={valide?classes.buttonValide:invalide?classes.buttonInvalide:enAttend?classes.buttonEnAttend:classes.buttonIncomplet}>
                            {demandeEtat} 
                        </Button>
                    </Grid>}
                    <Grid item>
                    <ButtonBase variant="contained" color="inherit" onClick={handleClickOpen} className={classes.margin}>
                        <ExitToApp/>
                    </ButtonBase>
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
                    </Dialog>
                    </Grid>
                </Grid>
            </Paper>
            <CssBaseline />
            <Typography variant="h5" align="center" paragraph>
                Bienvenue sur l'application de gestion des dossiers de vacataire en ligne. Cet outil vous permet de créer et modifier votre dossier de vacataire.
            </Typography>
            <CssBaseline />
            <Container maxWidth="xs" className={classes.root}>
                <Button
                fullWidth
                variant="outlined"
                style={{borderColor: '#1e88e5', color:'#1e88e5', margin:'25px auto'}}
                >
                    Consulter le document de vacataire
                </Button>
                <Button
                fullWidth
                variant="contained"
                className={classes.blueButton}
                component={AdapterLink} to={"/dossier-compte"}
                >
                    Remplir votre dossier
                </Button>
            </Container>
            {/* <Button variant="outlined" color="inherit" onClick={handleClickOpen} className={classes.quiter}>
              Quiter
            </Button>
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
          </Dialog>*/}
        </Container> 
    )
    //  : (
    //     <LoadingScreen/>
    // )
}


export default UserDashboard