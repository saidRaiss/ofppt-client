import React, {useEffect, useState} from 'react'
// import Upload from '../component/Upload'

// import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
// import {connect} from 'react-redux';
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
import {Person, MyLocation, School, Group} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingScreen from './LoadingScreen';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CostumStepper from '../component/Stepper'
import {isEmpty} from './../utils/validators';
import logo from '../assets/img/ofppt.logo.png';
import CustomStepper from '../component/Stepper';
import UserService from '../services/user.service'
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
        marginBottom: theme.spacing(2)
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
        '&:hover': {
          opacity: 0.8
        }
    },
    buttonDeleteUpload: {
        margin: theme.spacing(1),
    },
    input: {
        display: "block",
        width: 0,
        height: 0,
    }
}))

const DossierJustifs = () => {
    const [username, setUsername] = useState("NOM Prénom");
    useEffect(()=>{
        const data = JSON.parse(localStorage.user)
        setUsername(data.username.replace('_', ' '))
      }, [])
    // const [nom, setNom] = useState("");
    // const [prenom, setPrenom] = useState("");
    // const [email, setEmail] = useState("");
    // const [nomDirecteur, setNomDirecteur] = useState("");

    // const [nomError, setNomError] = useState("");
    // const [prenomError, setPrenomError] = useState("");
    // const [emailError, setEmailError] = useState("");
    // const [nomDirecteurError, setNomDirecteurError] = useState("");
    const [submited, setSubmited] = useState(false);
    // const [demande, setDemande] = useState();
    const jsonConcat = (o1, o2) => {
        for (var key in o2) {
            o1[key] = o2[key];
        }
        return o1;
    }
    const submit = () => {
        const compte = JSON.parse(localStorage.compte)
        const infoPer = JSON.parse(localStorage.infoPer)
        const infoPro = JSON.parse(localStorage.infoPro)
        let data = {}
        data = jsonConcat(data, compte)
        data = jsonConcat(data, infoPer)
        data = jsonConcat(data, infoPro)
        UserService.createDemande(data)
        setSubmited(true)
      }
    const selectFile = (event) => {}
    const uploadFile = () => {}
    // const handelNom = (event) => {
    //     setNom(event.target.value);
    // }
    // const handelPrenom = (event) => {
    //     setPrenom(event.target.value);
    // }
    // const handelEmail = (event) => {
    //     setEmail(event.target.value);
    // }
    // const handelNomDirecteur = (event) => {
    //     setNomDirecteur(event.target.value);
    // }

    const classes = useStyles();
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
    return (
        submited? <Redirect to={"/dashboard"}/>:
        <Container component="main" maxWidth="md" className={classes.root}>
            <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container item justify="flex-start" alignItems="center" className={classes.startBar}>
                    <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                    <Typography variant="h5">
                        <b>Bienvenue</b>{' ' + username}
                    </Typography>
                </Grid>
            </Paper>
            <CustomStepper activeIndex={3}/>
            {/* //
            // */}
            <Grid container style={{marginBottom:20}}>
                <Paper elevation={1} className={classes.paper}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} >
                        <Grid item>
                            {/* <label type="file" name="somename" size="chars" className={classes.input} onChange={selectFile}/> */}
                            <Button
                                variant="contained"
                                color="default"
                                component="label"
                                onClick={uploadFile}
                                className={classes.buttonDeleteUpload}
                                startIcon={<CloudUploadIcon />}
                            >
                                télécharger
                                <input type="file" hidden/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Autorisation de l'employeur principal
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                component="label"
                                className={classes.buttonDeleteUpload}
                                startIcon={<CloudUploadIcon />}
                            >
                                télécharger
                                <input type="file" hidden/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Attestation de travail récente ou attestation de pension (retraité)
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                component="label"
                                className={classes.buttonDeleteUpload}
                                startIcon={<CloudUploadIcon />}
                            >
                                télécharger
                                <input type="file" hidden/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Copie des diplômes obtenu Légalisés
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                component="label"
                                className={classes.buttonDeleteUpload}
                                startIcon={<CloudUploadIcon />}
                            >
                                télécharger
                                <input type="file" hidden/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Copie de CIN légalisé
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                component="label"
                                className={classes.buttonDeleteUpload}
                                startIcon={<CloudUploadIcon />}
                            >
                                télécharger
                                <input type="file" hidden/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Justificatifs d'expériences
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                component="label"
                                className={classes.buttonDeleteUpload}
                                startIcon={<CloudUploadIcon />}
                            >
                                télécharger
                                <input type="file" hidden/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Registre de commerce ou statut (gérant ou entrepreneur)
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                component="label"
                                className={classes.buttonDeleteUpload}
                                startIcon={<CloudUploadIcon />}
                            >
                                télécharger
                                <input type="file" hidden/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Déclaration CNSS ou autre régime de retraite
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1} >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                component="label"
                                className={classes.buttonDeleteUpload}
                                startIcon={<CloudUploadIcon />}
                            >
                                télécharger
                                <input type="file" hidden/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">
                                Attestation de RIB
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {/* //
            // */}
            <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
                <Button
                    className={classes.button}
                    component={AdapterLink} to="/dossier-info-professionnelles"
                    variant="outlined"
                    color="primary"
                    style={{
                    fontWeight: 800,
                    fontSize: 14,
                    marginTop: '10px',
                    marginBottom: '20px',
                    }}
                >
                    Précédent
                </Button>
                <Button
                    className={classes.button}
                    onClick={submit}
                    variant="contained"
                    color="primary"
                    style={{
                    fontWeight: 800,
                    fontSize: 14,
                    marginTop: '10px',
                    marginBottom: '20px',
                    }}
                >
                     sauvegarder mes modifications
                </Button>
            </Grid>
        </Container>
    )
}

export default DossierJustifs