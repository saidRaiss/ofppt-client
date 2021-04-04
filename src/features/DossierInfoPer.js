import 'date-fns'
import React, {useEffect, useState} from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Link, Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {isEmpty} from './../utils/validators';
import logo from '../assets/img/ofppt.logo.png'
import CustomStepper from '../component/Stepper'
import _countries_ from '../data/countries.json'
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

const DossierInfoPer = () => {
  const [username, setUsername] = useState("NOM Prénom");
  const [lieuNaissance, setLieuNaissance] = useState("")
  const [lieuNaissanceError, setLieuNaissanceError] = useState("")
  const handelLieuNaissance = (event) => {
      setLieuNaissance(event.target.value)
      setLieuNaissanceError("")
    }
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDateError, setSelectedDateError] = useState("")

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedDateError("")
  }

  const [situationFamilliale, setSituationFamilliale] = useState('Marié(e)')
  const situationsFamilliales = [
    {
      value: 'marie',
      label: 'Marié(e)',
    },
    {
      value: 'celibataire',
      label: 'Célibataire',
    },
    {
      value: 'divorse',
      label: 'Divorsé(e)',
    },
    {
      value: 'veuf',
      label: 'Veuf(ve)',
    },
  ]
  const handleSituationFamillialeChange = (event) => {
    setSituationFamilliale(event.target.value)
  }
  
  // Country
  const [country, setCountry] = useState('Morocco')
  const countries = _countries_
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }
  // Direction Générale
  const [directionGenerale, setDirectionGenerale] = useState("")
  const handleDirectionGeneraleChange = (event) => {
    setDirectionGenerale(event.target.value)
  }
  // Ville Affectation
  const [villeAffectation, setVilleAffectation] = useState("")
  const handleVilleAffectationChange = (event) => {
    setVilleAffectation(event.target.value)
  }
  // Etablissement
  const [etablissementAffectation, setEtablissementAffectation] = useState("")
  const handleEtablissementAffectationChange = (event) => {
    setEtablissementAffectation(event.target.value)
    console.log("setEtablissementAffectation(event.target.value)",event.target.value)
  }
  // Ville residence
  const [ville, setVille] = useState("")
  const [villeError, setVilleError] = useState("")
  const handelVille = (event) => {
    setVille(event.target.value)
    setVilleError("")
  }
  // Nationalité
  const [nationalite, setNationalite] = useState("")
  const [nationaliteError, setNationaliteError] = useState("")
  const handelNationalite = (event) => {
    setNationalite(event.target.value)
    setNationaliteError("")
  }
  // Adresse postale
  const [adressePostale, setAdressePostale] = useState("")
  const [adressePostaleError, setAdressePostaleError] = useState("")
  const handelAdressePostale = (event) => {
    setAdressePostale(event.target.value)
    setAdressePostaleError("")
  }
  // Code postal
  const [codePostal, setCodePostal] = useState("")
  const [codePostalError, setCodePostalError] = useState("")
  const handelCodePostal = (event) => {
    setCodePostal(event.target.value)
    setCodePostalError("")
  }
  useEffect(()=>{
    const data = JSON.parse(localStorage.user)
    setUsername(data.username.replace('_', ' '))
    if(localStorage.user_demande && localStorage.user_demande !== "{}"){
      const user_demande = JSON.parse(localStorage.user_demande)
      setLieuNaissance(user_demande.lieuNaissance)
      const dateT = new Date(Date.parse(user_demande.dateNaissance))
      setSelectedDate(dateT)
      setSituationFamilliale(user_demande.situationFamilliale)
      setCountry(user_demande.country)
      setDirectionGenerale(user_demande.directionGenerale)
      setVilleAffectation(user_demande.villeAffectation)
      setEtablissementAffectation(user_demande.etablissementAffectation)
      setVille(user_demande.ville)
      setNationalite(user_demande.nationalite)
      setAdressePostale(user_demande.adressePostale)
      setCodePostal(user_demande.codePostal)
    }
    else {
      if(localStorage.infoPer && localStorage.infoPer !== "{}") {
        const infoPer = JSON.parse(localStorage.infoPer)
        setLieuNaissance(infoPer.lieuNaissance)
        const dateS = new Date(Date.parse(infoPer.dateNaissance))
        setSelectedDate(dateS)
        setSituationFamilliale(infoPer.situationFamilliale)
        setCountry(infoPer.country)
        setDirectionGenerale(infoPer.directionGenerale)
        setVilleAffectation(infoPer.villeAffectation)
        setEtablissementAffectation(infoPer.etablissementAffectation)
        setVille(infoPer.ville)
        setNationalite(infoPer.nationalite)
        setAdressePostale(infoPer.adressePostale)
        setCodePostal(infoPer.codePostal)
    }
  }
    
}, [])

    const classes = useStyles()
    const [submited, setSubmited] = useState(false);
    const submit = () => {
      if(isEmpty(lieuNaissance)){
        setLieuNaissanceError("Lieu de naissance ne peut pas être vide!")
      }
      else if (isEmpty(nationalite)) {
        setNationaliteError("Nationalité ne peut pas être vide!")
      }
      else if(isEmpty(ville)){
        setVilleError("Ville de résidence ne peut être vide!")
      }
      else if(isEmpty(adressePostale)) {
        setAdressePostaleError("Adresse postale ne peut pas être vide!")
      }
      else if (isEmpty(codePostal)) {
        setCodePostalError("Code postale ne peut pas être vide!")
      }
      else if (isEmpty(selectedDate.toDateString())) {
        setSelectedDateError("Code postale ne peut pas être vide!")
      }
      else {
          localStorage.setItem("infoPer", JSON.stringify({
            "lieuNaissance":lieuNaissance,
            "nationalite":nationalite,
            "ville":ville,
            "adressePostale":adressePostale,
            "codePostal":codePostal,
            "dateNaissance":selectedDate.toDateString(),
            "situationFamilliale":situationFamilliale,
            "country":country,
            "directionGenerale":directionGenerale,
            "villeAffectation":villeAffectation,
            "etablissementAffectation":etablissementAffectation
  
        }))
          setSubmited(true)
        }
        
      }

    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />)
    return (
      submited? <Redirect to={"/dossier-info-professionnelles"}/>:
        <Container component="main" maxWidth="md" className={classes.root}>
            <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container item justify="flex-start" alignItems="center" className={classes.startBar}>
                    <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                    <Typography variant="h5">
                        <b>Bienvenue</b>{' ' + username}
                    </Typography>
                </Grid>
            </Paper>
            <CustomStepper activeIndex={1}/>
            {/* //
            // */}
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date de naissance"
                            format="dd/MM/yyyy"
                            maxDate={new Date()}
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {lieuNaissanceError === "" ? false : true}
                        required
                        fullWidth
                        id="lieuNaissance"
                        name="lieuNaissance"
                        label="Lieu de naissance"
                        value={lieuNaissance}
                        onChange={handelLieuNaissance}
                        helperText={lieuNaissanceError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {nationaliteError === "" ? false : true}
                        required
                        fullWidth
                        id="nationalite"
                        name="nationalite"
                        label="Nationalité"
                        value={nationalite}
                        onChange={handelNationalite}
                        helperText={nationaliteError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        id="situation-familliale"
                        fullWidth
                        select
                        label="Situation familliale"
                        value={situationFamilliale}
                        onChange={handleSituationFamillialeChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Veuillez selectionner votre situation familliale"
                        >
                        {situationsFamilliales.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        id="country"
                        fullWidth
                        select
                        label="Pays de résidence"
                        value={country}
                        onChange={handleCountryChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Veuillez selectionner votre pays."
                        >
                        {
                            countries.map((option) => (
                            <option key={option.countryShortCode} value={option.countryShortCode}>
                                {option.countryName}
                            </option>
                            ))
                        }
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {villeError === "" ? false : true}
                        required
                        fullWidth
                        id="ville"
                        name="ville"
                        label="Ville de résidence"
                        value={ville}
                        onChange={handelVille}
                        helperText={villeError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {adressePostaleError === "" ? false : true}
                        required
                        fullWidth
                        id="adressePostale"
                        name="adressePostale"
                        label="Adresse postales"
                        value={adressePostale}
                        onChange={handelAdressePostale}
                        helperText={adressePostaleError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        error = {codePostalError === "" ? false : true}
                        required
                        fullWidth
                        id="codePostal"
                        name="codePostal"
                        label="Code postal"
                        value={codePostal}
                        onChange={handelCodePostal}
                        helperText={codePostalError}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        id="directionGenerale"
                        fullWidth
                        select
                        label="Direction générale"
                        value={directionGenerale}
                        onChange={handleDirectionGeneraleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Veuillez selectionner la direction générale."
                        >
                          <option key={0} value={"none"}>
                            Veuillez selectionner la direction générale.
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                        id="villeAffectation"
                        fullWidth
                        select
                        label="Ville d'affectation"
                        value={villeAffectation}
                        onChange={handleVilleAffectationChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Veuillez selectionner la ville d'affectation."
                        >
                        {
                            etablissements.map((option) => (
                            option.dr === directionGenerale
                            &&
                            option.subdr.map((suboption) => (
                            <option key={suboption.ville} value={suboption.ville}>
                                {suboption.ville}
                            </option>))
                            ))
                        }
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                        helperText="Veuillez selectionner l'etablissement d'affectation."
                        >
                        {
                            etablissements.map((option) => (
                            option.dr === directionGenerale
                            &&
                            option.subdr.map((suboption) => (
                              suboption.ville === villeAffectation
                              &&
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
                </Grid>
            </Paper>
            {/* //
            // */}
            <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
                <Button
                  component={AdapterLink} to="/dossier-compte"
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

export default DossierInfoPer