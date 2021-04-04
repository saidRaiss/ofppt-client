import React from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import BackgroundSlider from 'react-background-slider'
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import background1 from './../assets/img/background1.jpg'
import background2 from './../assets/img/background2.jpg'
import background3 from './../assets/img/background3.jpg'
import { green } from '@material-ui/core/colors';
import logo from './../logo.svg';
import './../App.css';
import Header from "./../layout/Header"
import {createMuiTheme, createStyles, makeStyles, } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
        heroContent: {
            height: '100vh',
            backgroundImage: `url(${background2})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
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
        redButton: {
            backgroundColor: '#ff0000',
            borderColor: '#ff0000',
            color:"#fff",
            '&:hover': {
                backgroundColor: '#ff0000',
                borderColor: '#ff0000',
                boxShadow: 'none',
              },
        },
        greenButton: {
            borderColor: '#00ff00',
            color:"#00ff00",
            fontSize: 16,
            '&:hover': {
                backgroundColor: '#00ff00',
                borderColor: '#00ff00',
                color:"#ffffff",
                boxShadow: 'none',
              },
        },
}));



const Home= () => {
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
    const classes = useStyles()
    return (
        localStorage.user? <Redirect to={"/dashboard"}/>:
        <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h4" align="center" style={{color:'#ffffff'}} gutterBottom>
          L'Office de la Formation Professionnelle et de la Promotion du Travail
          </Typography>
          <Typography variant="h5" align="center" style={{color:'#ffffff'}}  paragraph>
          Bienvenue sur l'application de gestion des dossiers de vacataire en ligne. Cet outil vous permet de créer et modifier votre dossier de vacataire.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" className={classes.redButton} component={AdapterLink} to={"/signin"}>
                  S'identifier comme vacataire
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" className={classes.blueButton} component={AdapterLink} to={"/signup"}>
                  Créer un compte vacataire
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="outlined" className={classes.greenButton} component={AdapterLink} to={"/admin"}>
                  S'identifier comme responsable OFPPT
                </Button>
              </Grid>
            </Grid>
          </div>
          
        </Container>
      </div>
    // <Grid container component="main" className={classes.root}>
    //         <Button
    //             color="primary"
    //             variant="contained"
    //             style={{color:'#ffffff'}}
    //             component={AdapterLink}
    //             to="/signin"
    //         >
    //             Sign in
    //         </Button>
    //         <Button
    //             color="primary"
    //             variant="contained"
    //             style={{color:'#ffffff'}}
    //             component={AdapterLink}
    //             to="/signup"
    //         >
    //             Sign in
    //         </Button>
    // </Grid>
    );
}

export default Home;
