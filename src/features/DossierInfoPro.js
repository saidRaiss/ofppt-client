import React, {useEffect, useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../assets/img/ofppt.logo.png'
import CustomStepper from '../component/Stepper'
import {isEmpty} from './../utils/validators';
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

const DossierInfoPro = () => {
    const [username, setUsername] = useState("NOM Prénom");
    // Fonction exercée
    const [fonctionExercee, setFonctionExercee] = useState("")
    const [fonctionExerceeError, setFonctionExerceeError] = useState("")
    const handelFonctionExercee = (event) => {
        setFonctionExercee(event.target.value)
        setFonctionExerceeError("")
        }
    // Employeur
    const [employeur, setEmployeur] = useState("");
    const [employeurError, setEmployeurError] = useState("");
    const handelEmployeur = (event) => {
        setEmployeur(event.target.value);
        setEmployeurError("")
        }
  // Vacataire
  const [typeVacataire, setTypeVacataire] = useState('Marié(e)')
  const typeVacataires = [
    {
      value: 'retraite',
      label: 'Retraité(e)',
    },
    {
      value: 'fonctionnaire-doctorant',
      label: 'Fonctionnaire ou doctorant(e)',
    },
    {
      value: 'salarie-secteur-privee',
      label: 'Salarié(e) du secteur privée',
    },
    {
      value: 'chef-entreprise-gerant',
      label: "Chef d'entreprise et gérant",
    },
    {
      value: 'etudiant-doctorant',
      label: 'étudiant(e) doctorant(e)',
    },
    {
      value: 'auto-entrepreneur',
      label: 'Auto-entrepreneur',
    },
  ]
  const handleTypeVacataireChange = (event) => {
    setTypeVacataire(event.target.value)
  }
  
  
  // Spécialité du diplôme obtenu
  const [specialite, setSpecialite] = useState("")
  const [specialiteError, setSpecialiteError] = useState("")
  const handelSpecialite = (event) => {
    setSpecialite(event.target.value)
    setSpecialiteError("")
  }
  // Nombre d'années d'expérience
  const [nombreAnneeExperience, setNombreAnneeExperience] = useState("")
  const [nombreAnneeExperienceError, setNombreAnneeExperienceError] = useState("")
  const handelNombreAnneeExperience = (event) => {
    setNombreAnneeExperience(event.target.value)
    setNombreAnneeExperienceError("")
  }
  // Adresse Employeur
  const [adresseEmployeur, setAdresseEmployeur] = useState("")
  const [adresseEmployeurError, setAdresseEmployeurError] = useState("")
  const handelAdresseEmployeur = (event) => {
    setAdresseEmployeur(event.target.value)
    setAdresseEmployeurError("")
  }
  // Code postal Employeur
  const [codePostalEmployeur, setCodePostalEmployeur] = useState("")
  const [codePostalEmployeurError, setCodePostalEmployeurError] = useState("")
  const handelCodePostalEmployeur = (event) => {
    setCodePostalEmployeur(event.target.value)
    setCodePostalEmployeurError("")
  }
  // nombre Heures Travail
  const [nombreHeuresTravail, setNombreHeuresTravail] = useState("")
  const [nombreHeuresTravailError, setNombreHeuresTravailError] = useState("")
  const handelNombreHeuresTravail = (event) => {
    setNombreHeuresTravail(event.target.value)
    setNombreHeuresTravailError("")
  }
  useEffect(()=>{
    const data = JSON.parse(localStorage.user)
    setUsername(data.username.replace('_', ' '))
    if(localStorage.user_demande && localStorage.user_demande !== "{}"){
      const user_demande = JSON.parse(localStorage.user_demande)
      setFonctionExercee(user_demande.fonctionExercee)
      setEmployeur(user_demande.employeur)
      setTypeVacataire(user_demande.typeVacataire)
      setSpecialite(user_demande.specialite)
      setNombreAnneeExperience(user_demande.nombreAnneeExperience)
      setAdresseEmployeur(user_demande.adresseEmployeur)
      setNombreHeuresTravail(user_demande.nombreHeuresTravail)
      setCodePostalEmployeur(user_demande.codePostalEmployeur)
    }
    else {
      if(localStorage.infoPro && localStorage.infoPro !== "{}") {
        const infoPro = JSON.parse(localStorage.infoPro)
        setFonctionExercee(infoPro.fonctionExercee)
        setEmployeur(infoPro.employeur)
        setTypeVacataire(infoPro.typeVacataire)
        setSpecialite(infoPro.specialite)
        setNombreAnneeExperience(infoPro.nombreAnneeExperience)
        setAdresseEmployeur(infoPro.adresseEmployeur)
        setNombreHeuresTravail(infoPro.nombreHeuresTravail)
        setCodePostalEmployeur(infoPro.codePostalEmployeur)
    }
  }
    
}, [])
  const [submited, setSubmited] = useState(false);
  
  const submit = () => {
    if(isEmpty(fonctionExercee)){
      setFonctionExerceeError("Fonction exercée ne peut pas êtrevide!")
    }
    else if(isEmpty(employeur)) {
      setEmployeurError("Nom de l'employeur ne peut pas êtrevide!")
    }
    else if(isEmpty(adresseEmployeur)) {
      setAdresseEmployeurError("Adresse d'employeur ne peut pas êtrevide!")
    }
    else if(isEmpty(codePostalEmployeur)) {
      setCodePostalEmployeurError("Code postal ne peut pas êtrevide!")
    }
    else if(isEmpty(nombreAnneeExperience)) {
      setNombreAnneeExperienceError("Nombre d'années d'expérience ne peut pas êtrevide!")
    }
    else if(isEmpty(specialite)) {
      setSpecialiteError("Spécialité du diplôme obtenu ne peut pas êtrevide!")
    }
    else if(isEmpty(nombreHeuresTravail)) {
      setNombreHeuresTravailError("Nombre d'heures de travail par semaine ne peut pas êtrevide!")
    }
    else {
      localStorage.setItem("infoPro", JSON.stringify({
        "fonctionExercee":fonctionExercee,
        "employeur":employeur,
        "adresseEmployeur":adresseEmployeur,
        "nombreAnneeExperience":nombreAnneeExperience,
        "codePostalEmployeur":codePostalEmployeur,
        "specialite":specialite,
        "nombreHeuresTravail":nombreHeuresTravail,
        "typeVacataire":typeVacataire

    }))
      setSubmited(true)
    }
  }
    const classes = useStyles()
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)
    return (
      submited? <Redirect to={"/dossier-justificatifs"}/>:
        <Container component="main" maxWidth="md" className={classes.root}>
            <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container item justify="flex-start" alignItems="center" className={classes.startBar}>
                    <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                    <Typography variant="h5">
                        <b>Bienvenue</b>{' ' + username}
                    </Typography>
                </Grid>
            </Paper>
            <CustomStepper activeIndex={2}/>
            {/* //
            // */}
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        id="type-vacataire"
                        fullWidth
                        select
                        label="Type vacataire"
                        value={typeVacataire}
                        onChange={handleTypeVacataireChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Veuillez selectionner votre type vacataire"
                        >
                        {typeVacataires.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {fonctionExerceeError === "" ? false : true}
                        required
                        fullWidth
                        id="fonction-exercee"
                        name="FonctionExercee"
                        label="Fonction exercée"
                        value={fonctionExercee}
                        onChange={handelFonctionExercee}
                        helperText={fonctionExerceeError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        error = {employeurError === "" ? false : true}
                        required
                        fullWidth
                        id="employeur"
                        name="employeur"
                        label="Nom de l'employeur"
                        value={employeur}
                        onChange={handelEmployeur}
                        helperText={employeurError}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {adresseEmployeurError === "" ? false : true}
                        required
                        fullWidth
                        id="adresseEmployeur"
                        name="adresseEmployeur"
                        label="Adresse d'employeur"
                        value={adresseEmployeur}
                        onChange={handelAdresseEmployeur}
                        helperText={adresseEmployeurError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {codePostalEmployeurError === "" ? false : true}
                        required
                        fullWidth
                        id="codePostal"
                        name="codePostal"
                        label="Code postal"
                        value={codePostalEmployeur}
                        onChange={handelCodePostalEmployeur}
                        helperText={codePostalEmployeurError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {nombreAnneeExperienceError === "" ? false : true}
                        required
                        fullWidth
                        id="nombreAnneeExperience"
                        name="nombreAnneeExperience"
                        label="Nombre d'années d'expérience"
                        value={nombreAnneeExperience}
                        onChange={handelNombreAnneeExperience}
                        helperText={nombreAnneeExperienceError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {specialiteError === "" ? false : true}
                        required
                        fullWidth
                        id="specialite"
                        name="specialite"
                        label="Spécialité du diplôme obtenu"
                        value={specialite}
                        onChange={handelSpecialite}
                        helperText={specialiteError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {nombreHeuresTravailError === "" ? false : true}
                        required
                        fullWidth
                        id="nombreHeuresTravail"
                        name="nombreHeuresTravail"
                        label="Nombre d'heures de travail par semaine"
                        value={nombreHeuresTravail}
                        onChange={handelNombreHeuresTravail}
                        helperText={nombreHeuresTravailError}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {/* //
            // */}
            <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
                <Button
                    className={classes.button}
                    component={AdapterLink} to="/dossier-info-personnelles"
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

export default DossierInfoPro