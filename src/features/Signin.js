import React, { useState } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import imageBackg from './../assets/img/img.signin.jpg'
import {isEmpty} from './../utils/validators';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${imageBackg})`,
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

const Signin = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submited, setSubmited] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const classes = useStyles();
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  const CustomLink = props => <Link to={props.to} {...props} />;

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
      AuthService.login(email, password).then(
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
    submited || localStorage.getItem('user')? <Redirect to={"/dashboard"}/>:
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'identifier
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
              label="Adresse Email"
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
              color="primary"
              className={classes.submit}
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
                <Link to={"/signup"} variant="body2" style={{cursor: 'pointer'}}>
                  Vous n'avez pas de compte? S'inscrire
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default Signin