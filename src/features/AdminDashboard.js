import React, {useState, useEffect} from 'react'
import Upload from '../component/Upload'
import { Redirect } from 'react-router-dom'
import {ButtonBase} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Person, MyLocation, School, Group, SettingsInputAntennaTwoTone} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingScreen from './LoadingScreen';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CostumStepper from '../component/Stepper'
import {ExitToApp} from '@material-ui/icons';
import logo from '../assets/img/ofppt.logo.png';
import CustomStepper from '../component/Stepper';
import UserService from '../services/user.service';
import etablissements from '../data/etablissements.json'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 10,
      marginBottom: 100,
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
        marginBottom: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
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
    button: {
        borderRadius: '25px',
        marginRight:25,
        '&:hover': {
          opacity: 0.8
        }
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
        marginRight:5,
        '&:hover': {
            borderColor: '#ff0000',
            color:"#ff0000",
            opacity: 0.8
        }
    },
    margin: {
        marginLeft:100,
        marginRight:0
    },
}))

const AdminDashboard = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState();
    const [demandes, setdemandes] = useState();
    const [open, setOpen] = useState(false);
    const [exited, setExited] = useState(false);
    const [demandesDisplay, setdemandesDisplay] = useState();

    const [etablissementAffectation, setEtablissementAffectation] = useState("")
    const handleEtablissementAffectationChange = (event) => {
        setEtablissementAffectation(event.target.value)
    }
    // Direction Générale
    const [directionGenerale, setDirectionGenerale] = useState("")
    const handleDirectionGeneraleChange = (event) => {
        setDirectionGenerale(event.target.value)
    }
    useEffect(()=>{
        const data = JSON.parse(localStorage.user)
        setUserData(data)
        setUsername(data.etablissement)
        const roles = data.roles
        let allDemandes = []
        if(roles[0] === "ROLE_DIC_ETA") {
            UserService.getall().then((res) => {
                res.forEach(demande => {
                    if(data.etablissementCode === demande.etablissementAffectation){
                        allDemandes.push(demande)
                    }
                })
                console.log(JSON.stringify(allDemandes))
                localStorage.setItem("all_demandes", JSON.stringify(allDemandes));
                setdemandes(allDemandes)
                setdemandesDisplay(allDemandes)
            }).catch((err) => {
                 console.log(err)
            })
        }
        else if(roles[0] === "ROLE_DIC_REG") {
            UserService.getall().then((res) => {
                res.forEach(demande => {
                    if(data.region === demande.directionGenerale){
                        allDemandes.push(demande)
                    }
                })
                console.log(JSON.stringify(allDemandes))
                localStorage.setItem("all_demandes", JSON.stringify(allDemandes));
                setdemandes(allDemandes)
                setdemandesDisplay(allDemandes)
            }).catch((err) => {
                 console.log(err)
            })
        }
        else{
            UserService.getall().then((res) => {
                res.forEach(demande => {
                    allDemandes.push(demande)
                })
                console.log(JSON.stringify(allDemandes))
                localStorage.setItem("all_demandes", JSON.stringify(allDemandes));
                setdemandes(allDemandes)
                setdemandesDisplay(allDemandes)
            }).catch((err) => {
                 console.log(err)
            })
        }
    }, [])
    const vacataires = [
        {
            "id":1,
            "nom":"Nom Prénom",
        },
        {
            "id":2,
            "nom":"Nom Prénom",
        },
        {
            "id":3,
            "nom":"Nom Prénom",
        },
        {
            "id":4,
            "nom":"Nom Prénom",
        },
        {
            "id":5,
            "nom":"Nom Prénom",
        },
        {
            "id":6,
            "nom":"Nom Prénom",
        },
        {
            "id":7,
            "nom":"Nom Prénom",
        },
        {
            "id":8,
            "nom":"Nom Prénom",
        },
        {
            "id":9,
            "nom":"Nom Prénom",
        },
        {
            "id":10,
            "nom":"Nom Prénom",
        },
    ]
    const showme = () => {
        console.log(demandes)
    }
    const filter = () => {
        let demandeToDisplay = []
        demandes.forEach(demande => {
            if(etablissementAffectation!=="eta_none" && etablissementAffectation.toLocaleLowerCase() === demande.etablissementAffectation.toLocaleLowerCase()){
                demandeToDisplay.push(demande)
            }
        })
        setdemandesDisplay(demandeToDisplay)
    }
    
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
    const classes = useStyles();
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
    if(userData && userData.roles[0] === "ROLE_DIC_GLO") {
        return(
        <>
        <Container component="main" maxWidth="md" className={classes.root}>
            <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container item justify="flex-start" alignItems="center" className={classes.startBar}>
                    <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                    <Typography variant="h6">
                        <b>Bienvenue</b>{' ' + username}
                    </Typography>
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
            </Paper>
            <CssBaseline />
            <Typography variant="h5" align="center" paragraph>
                Bienvenue sur l'application admin de gestion des dossiers de vacataire en ligne. Cet outil vous permet de gérer les demandes des enseignants vacataires.
            </Typography>
            <CssBaseline />
            <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                <Grid item style={{marginRight:15}}>
                    <TextField id="directionGenerale" fullWidth
                        select
                        label="Direction générale"
                        value={directionGenerale}
                        onChange={handleDirectionGeneraleChange}
                        SelectProps={{
                            native: true,
                        }}
                        >
                            <option key={0} value={"none"}>
                            Veuillez selectionner une region.
                            </option>
                        {
                            etablissements.map((option) => (
                            <option key={option.dr} value={option.dr}>
                                {option.dr}
                            </option>
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item style={{marginRight:15}}>
                    <TextField id="etablissementAffectation" fullWidth select label="Etablissement d'affectation" value={etablissementAffectation}
                        onChange={handleEtablissementAffectationChange}
                        SelectProps={{
                            native: true,
                        }}
                        >
                            <option key={1000} value={"eta_none"}>
                                Veuillez selectionner une etablissement.
                            </option>
                        {
                            etablissements.map((option) => (
                            option.dr === directionGenerale
                            &&
                            option.subdr.map((suboption) => (
                            suboption.etablissement.map((subsubopt)=>(
                                <option key={subsubopt.val} value={subsubopt.val}>
                                {subsubopt.eta}
                                </option>
                            ))
                            ))
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item style={{marginRight:15}}>
                    <Button onClick={filter}>Filter</Button>
                </Grid>
            </Grid>
            <Grid container style={{marginBottom:20, marginTop:25}}>
            {
                    demandesDisplay && demandesDisplay.map((demande) => (
                        <Paper elevation={1} className={classes.paper} key={demande.id}>
                            <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                                <Grid item style={{marginLeft:15}}>
                                    <Typography variant="h6">
                                        Demande {demande.id} : {demande.prenom.toUpperCase() + " " + demande.nom.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginRight:15}} key={demande.id}>
                                    <Button
                                        component={AdapterLink} to={{pathname:"/consulter-demande", state:{demande}}}
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        onClick={showme}
                                    >
                                        Consulter
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                }
            </Grid>
        </Container>
        </>
        )
    }
    else if(userData && userData.roles[0] === "ROLE_DIC_REG") {
        return (
        <>
        <Container component="main" maxWidth="md" className={classes.root}>
        <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container item justify="flex-start" alignItems="center" className={classes.startBar}>
                    <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                    <Typography variant="h6">
                        <b>Bienvenue</b>{' ' + username}
                    </Typography>
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
            </Paper>
            <CssBaseline />
            <Typography variant="h5" align="center" paragraph>
                Bienvenue sur l'application admin de gestion des dossiers de vacataire en ligne. Cet outil vous permet de gérer les demandes des enseignants vacataires.
            </Typography>
            <CssBaseline />
            <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                <Grid item style={{marginRight:15}}>
                    <TextField
                        id="etablissementAffectation"
                        fullWidth
                        select
                        label="Etablissement d'affectation"
                        value={etablissementAffectation}
                        onChange={handleEtablissementAffectationChange}
                        SelectProps={{
                            native: true,
                        }}
                        >
                            <option key={1000} value={"eta_none"}>
                            Veuillez selectionner une etablissement.
                            </option>
                        {
                            etablissements.map((option) => (
                            option.dr === userData.region
                            &&
                            option.subdr.map((suboption) => (
                            suboption.etablissement.map((subsubopt)=>(
                                <option key={subsubopt.val} value={subsubopt.val}>
                                {subsubopt.eta}
                                </option>
                            ))
                            ))
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item style={{marginRight:15}}>
                    <Button onClick={filter}>Filter</Button>
                </Grid>
            </Grid>
            <Grid container style={{marginBottom:20, marginTop:25}}>
            {
                    demandesDisplay && demandesDisplay.map((demande) => (
                        <Paper elevation={1} className={classes.paper} key={demande.id}>
                            <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                                <Grid item style={{marginLeft:15}}>
                                    <Typography variant="h6">
                                        Demande {demande.id} : {demande.prenom.toUpperCase() + " " + demande.nom.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginRight:15}} key={demande.id}>
                                    <Button
                                        component={AdapterLink} to={{pathname:"/consulter-demande", state:{demande}}}
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        onClick={showme}
                                    >
                                        Consulter
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                }
            </Grid>
        </Container>
        </>
        )
    }
    else if(exited){
        return (<Redirect to={"/home"}/>)
    }
    else{
    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
             <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container item justify="flex-start" alignItems="center" className={classes.startBar}>
                    <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                    <Typography variant="h6">
                        <b>Bienvenue</b>{' ' + username}
                    </Typography>
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
            </Paper>
            <CssBaseline />
            <Typography variant="h5" align="center" paragraph>
                Bienvenue sur l'application admin de gestion des dossiers de vacataire en ligne. Cet outil vous permet de gérer les demandes des enseignants vacataires.
            </Typography>
            <CssBaseline />
            <Grid container style={{marginBottom:20}}>
            {
                    demandesDisplay && demandesDisplay.map((demande) => (
                        <Paper elevation={1} className={classes.paper} key={demande.id}>
                            <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
                                <Grid item style={{marginLeft:15}}>
                                    <Typography variant="h6">
                                        Demande {demande.id} : {demande.prenom.toUpperCase() + " " + demande.nom.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item style={{marginRight:15}} key={demande.id}>
                                    <Button
                                        component={AdapterLink} to={{pathname:"/consulter-demande", state:{demande}}}
                                        variant="contained"
                                        color="default"
                                        className={classes.button}
                                        onClick={showme}
                                    >
                                        Consulter
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                }
            </Grid>
            {/* //
            // */}
        </Container>
    )
    }
}

export default AdminDashboard