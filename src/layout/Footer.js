import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Copyright from '../component/Copyright'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
        left:'0px',
        bottom:'0px',
        right:'0px',
        margin:'auto',
        backgroundColor:"#333333",
    },
    container:{
        backgroundColor:"#333333",
        minHeight: '52px',
    }
  }),
);

const Footer = () => {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Grid container direction="column" alignItems="center" justify="center" className={classes.container} >
                    <Copyright/>
                </Grid>
            </Container>
        </footer>
    )
}

export default Footer;