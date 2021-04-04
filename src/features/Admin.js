import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../assets/img/ofppt.logo.png'
import AuthService from "../services/auth.service";
import {isEmpty} from './../utils/validators';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#ff0000'
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  redButton: {
    backgroundColor: '#ff0000',
    borderColor: '#ff0000',
    color:"#fff",
    margin: theme.spacing(3, 0, 2),
    '&:hover': {
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
        boxShadow: 'none',
      },
    },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Admin = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [submited, setSubmited] = useState(false);

  const classes = useStyles();

  const handelEmail = (event) => {
    setEmail(event.target.value)
    setEmailError("")
  }
  const handelPassword = (event) => {
    setPassword(event.target.value)
    setPasswordError("")
  }
  const submitForm = () => {
    if(isEmpty(email)) {
      setEmailError("Adresse email ne peut pas être vide!")
    }
    else if(isEmpty(password)) {
      setPasswordError("Le mot de passe ne peut pas être vide!")
    }
    else {
      AuthService.loginadmin(email, password).then(
        (res)=>{
          setSubmited(true);
        }
      ).catch((err)=>{
        if(err.message === "Request failed with status code 404") {
          setEmailError("Utilisateur non trouvé!")
        }
        if(err.message === "Request failed with status code 401") {
          setPasswordError("Le mot de passe est incorrect!")
        }
      })
    }
  }

  return (
    submited ? <Redirect to={"/admin-dashboard"}/>:
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
        <Typography component="h1" variant="h5">
        S'identifier comme admin
        </Typography>
        <form className={classes.form} noValidate>
            <TextField
              error={emailError!==""}
              helperText={emailError}
              value={email}
              onChange={handelEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Identifiant"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={passwordError!==""}
              helperText={passwordError}
              value={password}
              onChange={handelPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Rester connecté"
            />
            <Button
              fullWidth
              variant="contained"
              className={classes.redButton}
              onClick={submitForm}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={"/reset-password"} variant="body2" style={{cursor: 'pointer'}}>
                  Mot de passe oublié?
                </Link>
              </Grid>
              <Grid item>
                {/* <Link to={"/signup"} variant="body2" style={{cursor: 'pointer'}}>
                  Vous n'avez pas de compte? S'inscrire
                </Link> */}
              </Grid>
            </Grid>
          </form>
      </div>
    </Container>
  );
}

export default Admin