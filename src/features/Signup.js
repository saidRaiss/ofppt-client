import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import signupBackg from './../assets/img/img.signup.jpg'
import {isEmpty, isEmail} from './../utils/validators';
import AuthService from "../services/auth.service";

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${signupBackg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const [submited, setSubmited] = useState(false);
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const classes = useStyles();

  const handelFirstname = (event) => {
    setFirstname(event.target.value);
    setFirstnameError("")
  }
  const handelLastname = (event) => {
    setLastname(event.target.value);
    setLastnameError("")
  }
  const handelEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("")
  }

  const handelPassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("")
  }
  const handelConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("")
  }
  const submitFrom = () => {
    if(isEmpty(firstname)) {
      setFirstnameError("Prénom ne peut pas être vide!")
    }
    else if(isEmpty(lastname)) {
      setLastnameError("Nom ne peut pas être vide!")
    }
    else if(isEmpty(email)) {
      setEmailError("Adresse email ne peut pas être videt!")
    }
    else if(!isEmail(email)) {
      setEmailError("Adresse email est incorrecte!")
    }
    else if(isEmpty(password)) {
      setPasswordError("Le mot de passe ne peut pas être vide!")
    }
    else if(password.trim().length < 8) {
      setPasswordError("Mot de passe doit être d'au moins 8 caractères!")
    }
    else if(password !== confirmPassword) {
      setConfirmPasswordError("Assurez-vous que les deux mots de passe correspondent!")
    }
    else {
      const username = firstname + '_' + lastname
      console.log("user", username, email, password);
      AuthService.register( firstname, lastname, username, email, password).then((res) => {
        console.log(res);
        setSubmited(true);
      }).catch((err) => {
        console.log("register error");
        console.log(err);
        console.error(err);
        console.log(err.message);
      })
    }
  }

  return (
    submited ? <Redirect to={"/signin"}/>:
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Créer un compte
            </Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    error={firstnameError!==""}
                    helperText={firstnameError}
                    value={firstname}
                    onChange={handelFirstname}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Prénom"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    error={lastnameError!==""}
                    helperText={lastnameError}
                    value={lastname}
                    onChange={handelLastname}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Nom"
                    name="lastName"
                    autoComplete="lname"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={emailError!==""}
                    helperText={emailError}
                    value={email}
                    onChange={handelEmail}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Adresse Email"
                    name="email"
                    autoComplete="email"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={passwordError!==""}
                    helperText={passwordError}
                    value={password}
                    onChange={handelPassword}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={confirmPasswordError!==""}
                    helperText={confirmPasswordError}
                    value={confirmPassword}
                    onChange={handelConfirmPassword}
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirmer le mot de passe"
                    type="password"
                    id="confirm-password"
                    autoComplete="password"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Je souhaite recevoir des notifications et des mises à jour par e-mail."
                />
                </Grid>
            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitFrom}
            >
                S'inscrire
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="#" variant="body2">
                  Vous avez déjà un compte? S'identifier
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default Signup