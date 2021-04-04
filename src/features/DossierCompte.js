import React, {useEffect, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import {isEmpty, isEmail} from './../utils/validators';
import logo from '../assets/img/ofppt.logo.png';
import CustomStepper from '../component/Stepper';

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
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
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
}))

const DossierCompte = () => {
    const [username, setUsername] = useState("NOM Prénom");

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [nomDirecteur, setNomDirecteur] = useState("");

    const [nomError, setNomError] = useState("");
    const [prenomError, setPrenomError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nomDirecteurError, setNomDirecteurError] = useState("");
    const [submited, setSubmited] = useState(false);
    useEffect(()=>{
        const data = JSON.parse(localStorage.user)
        setUsername(data.username.replace('_', ' '))
        if(localStorage.user_demande && localStorage.user_demande !== "{}"){
            const user_demande = JSON.parse(localStorage.user_demande)
            setNom(user_demande.nom)
            setPrenom(user_demande.prenom)
            setEmail(user_demande.email)
            setNomDirecteur(user_demande.nomDirecteur)
        }
        else if(localStorage.compte && localStorage.compte !== "{}") {
            const compte = JSON.parse(localStorage.compte)
            setNom(compte.nom)
            setPrenom(compte.prenom)
            setEmail(compte.email)
            setNomDirecteur(compte.nomDirecteur)
        }
        else {
            setNom(data.firstname)
            setPrenom(data.lastname)
            setEmail(data.email)
        }
        
    }, [])
    const handelNom = (event) => {
        setNom(event.target.value);
        setNomError("");
    }
    const handelPrenom = (event) => {
        setPrenom(event.target.value);
        setPrenomError("");
    }
    const handelEmail = (event) => {
        setEmail(event.target.value);
        setEmailError("");
    }
    const handelNomDirecteur = (event) => {
        setNomDirecteur(event.target.value);
        setNomDirecteurError("");
    }
    const submit = () => {
        if(isEmpty(nom)) {
            setNomError("Nom ne peut pas être vide!")
        }
        else if(isEmpty(prenom)) {
            setPrenomError("Prénom ne peut pas être vide!")
        }
        else if(isEmpty(email)) {
            setEmailError("Email ne peut pas être vide!")
        }
        else if(!isEmail(email)) {
            setEmailError("Adresse email est incorrescte!")
        }
        else if(isEmpty(nomDirecteur)) {
            setNomDirecteurError("Nom du directeur ne peut pas être vide!")
        }
        else{
            localStorage.setItem("compte", JSON.stringify({
                "nom":nom,
                "prenom":prenom,
                "email":email,
                "nomDirecteur":nomDirecteur
            }))
            setSubmited(true)
        }
    }
    const classes = useStyles();
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
    return (
        submited? <Redirect to={"/dossier-info-personnelles"}/>:
        <Container component="main" maxWidth="md" className={classes.root}>
            <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container item justify="flex-start" alignItems="center" className={classes.startBar}>
                    <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                    <Typography variant="h5">
                        <b>Bienvenue</b>{' ' + username}
                    </Typography>
                </Grid>
            </Paper>
            <CustomStepper activeIndex={0}/>
            {/* //
            // */}
            <Paper className={classes.paper}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {nomError === "" ? false : true}
                        required
                        fullWidth
                        id="nom"
                        name="nom"
                        label="Nom"
                        value={nom}
                        onChange={handelNom}
                        helperText={nomError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {prenomError === "" ? false : true}
                        required
                        fullWidth
                        id="prenom"
                        name="prenom"
                        label="Prénom"
                        value={prenom}
                        onChange={handelPrenom}
                        helperText={prenomError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {emailError === "" ? false : true}
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Adresse électronique"
                        value={email}
                        onChange={handelEmail}
                        helperText={emailError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {nomDirecteurError === "" ? false : true}
                        required
                        fullWidth
                        id="numero"
                        name="numero"
                        label="Nom du directeur qui vous a recruté"
                        value={nomDirecteur}
                        onChange={handelNomDirecteur}
                        helperText={nomDirecteurError}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {/* //
            // */}
            <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
                <Button
                    component={AdapterLink} to="/dashboard"
                    className={classes.button}
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

export default DossierCompte