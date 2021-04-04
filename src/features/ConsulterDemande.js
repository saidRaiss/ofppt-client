import React, {useCallback, useEffect, useState} from 'react'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
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
import {Person, MyLocation, School, Group} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingScreen from './LoadingScreen';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CostumStepper from '../component/Stepper'
import CircularProgress from '@material-ui/core/CircularProgress';
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
        '&:hover': {
          opacity: 0.8
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    table: {
        width: "100%",
      },
    chip: {
        margin: theme.spacing(0.5),
    },
    paperChip: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    buttonValide: {
        borderColor: '#00ff00',
        color:"#00ff00",
        borderRadius: '25px',
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
        '&:hover': {
            borderColor: '#ff0000',
            color:"#ff0000",
            opacity: 0.8
        }
    },
}))
const Progress = () => {
    return (<CircularProgress color="#0f0" size={20} />)
}
const AdminDashboard = (props) => {
    const [data, setData] = useState()
    const [valide, setValide] = useState(false)
    const [clicked, setClicked] = useState(false)
    const etablissements = [
        {eta:"Centre de Qualification Professionnelle Al Massira Daoudiate - Marrakech", val:"cqpmdm"},
        {eta:"Institut Spécialisé de Gestion et d'Informatique - Marrakech", val:"isgim"},
        {eta:"Centre de Sauvegarde de la Jeune Fille - Marrakech", val:"csjfm"},
        {eta:"Institut Spécialisé de l'Hôtellerie et de la Restauration - Marrakech", val:"ishrm"},
        {eta:"Institut Spécialisé de Technologie Appliquée Bab Doukkala - Marrakech", val:"istabdm"},
        {eta:"Institut Spécialisé de Technologie Appliquée de Textile et Confection Daoudiate - Marrakech", val:"istatcdm"},
        {eta:"Institut Spécialisé de Technologie Appliquée Jbel Lakhdar - Marrakech", val:"istajlm"},
        {eta:"Institut Spécialisé de Technologie Appliquée Maintenance Hôtelière - Marrakech", val:"istamhm"},
        {eta:"Institut Spécialisé de Technologie Appliquée NTIC Sidi Youssef Ben Ali - Marrakech", val:"istanticm"},
        {eta:"Institut Spécialisé Industriel - Marrakech", val:"isim"},
        {eta:"Centre Socio-Educatif El Machouar Kasbah - Marrakech", val:"csemkm"},
        {eta:"Centre de Développement des Compétences Hôtellerie Tourisme - Marrakech", val:"cdcht"},
        {eta:"Institut Spécialisé de Technologie Appliquée Azli - Marrakech", val:"istaam"},
        {eta:"Centre de Formation dans les Métiers du Bâtiment - Marrakech", val:"cfmbm"},
        {eta:"Institut Spécialisé de Technologie en Hôtellerie et de Tourisme - Safi", val:"isthts"},
        {eta:"Institut Spécialisé de Technologie Appliquée 2 - Safi", val:"ista2s"},
        {eta:"Centre Mixte de Formation Professionnelle - Safi", val:"cmfps"},
        {eta:"Institut Spécialisé de Technologie Appliquée 1 - Safi", val:"ista1s"},
        {eta:"Institut Spécialisé de Technologie Appliquée NTIC - Safi", val:"istantics"},
        {eta:"Centre de Qualification Professionnelle Sidi Ouassel - Safi", val:"cqpsos"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Tamensourt", val:"istat"},
        {eta:"Institut Spécialisé dans les Métiers du Transport Routier et Logistique - Benguerir", val:"ismtrlb"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Bengrir", val:"istab"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Chichaoua", val:"istac"},
        {eta:"Centre de Qualification Professionnelle - Tahannaout", val:"capt"},
        {eta:"Institut Spécialisé de Technologie en Hôtellerie et de Tourisme - Essaouira", val:"isthte"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Essaouira", val:"istae"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Kalaa-Sraghna", val:"istaks"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Youssoufia", val:"istay"},
        {eta:"Institut Spécialisté de Technologie Appliquée - Ouarzazate", val:"istao"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Zagora", val:"istaz"},
        {eta:"Institut Spécialisé du Bâtiment et des Travaux Publiques - Errachidia", val:"isbtpe"},
        {eta:"Institut Spécialisé de Technologie Appliquée Goulmima", val:"istag"},
        {eta:"Institut Spécialisé de Technologie Appliquée Mohamed El Fassi - Errachidia", val:"istamfe"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Midelt", val:"istam"},
        {eta:"Néant", val:"None"},
        {eta:"Institut Spécialisé de Technologie Appliquée - Erfoud", val:"istaer"},
        {eta:"Centre de Formation des Gouvernantes - Erfoud", val:"cfge"}
    ]
    const [chipData, setChipData] = useState([
        { key: 0, label: 'Mathématique' },
        { key: 1, label: 'Informatique' },
        { key: 2, label: 'Mécanique' },
        { key: 3, label: 'Hydrolique' },
        { key: 4, label: 'Gestion de projet professionnel' },
        { key: 5, label: "Gestion d'entreprise" },
        { key: 6, label: "Management de projet" },
        { key: 7, label: "Comptabilité & Management" },
        { key: 8, label: "Comptabilité & Management" },
      ]);
    
      const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      };
      useEffect(()=>{
          setData(props.location.state.demande)
          if(valide===false){
            const timer = setInterval(() => {
                setValide(true);
              }, 10000);
              return () => {
                clearInterval(timer);
              };
          }
          
      }, [])
    const classes = useStyles();
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
    const reffuser = () => {
        UserService.chengerDemandeEtat(data.email, "Réffusée").then(res => {
            alert("La demande est réffusée")
        }).catch(err => {
            console.log(err)
        })
    }
    const valider = () => {
        UserService.chengerDemandeEtat(data.email, "Validée").then(res => {
            alert("La demande est validée")
        }).catch(err => {
            console.log(err)
        })
    }
    const verifier = () => {
        setClicked(true)
        
    }
    return (
        data?
        <Container component="main" maxWidth="md" className={classes.root}>
            <Paper style={{left:0, right:0, margin:'25px auto'}}>
                <Grid container item justify="flex-start" alignItems="center" className={classes.startBar}>
                    <Avatar alt="Ofppt logo" src={logo} className={classes.avatar} />
                    <Typography variant="h5">
                        <b>Demande :</b>{' '} {data.prenom.toUpperCase() + ' ' + data.nom.toUpperCase()}
                    </Typography>
                </Grid>
            </Paper>
            {/* //
            // */}
            <Grid container style={{marginBottom:20, flex:1}}>
                <Accordion style={{flexGrow: 1, width:"100vh"}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Compte</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid style={{width:"100%"}}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            Nom
                                        </TableCell>
                                        <TableCell align="right">{data.nom}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Prénom
                                        </TableCell>
                                        <TableCell align="right">{data.prenom}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Adresse électronique
                                        </TableCell>
                                        <TableCell align="right">{data.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Nom du directeur qui vous a recruté
                                        </TableCell>
                                        <TableCell align="right">{data.nomDirecteur}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{flexGrow: 1, width:"100vh"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Les informations personnelles</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid style={{width:"100%"}}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            Date de naissance
                                        </TableCell>
                                        <TableCell align="right">{data.dateNaissance}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Lieu de naissance
                                        </TableCell>
                                        <TableCell align="right">{data.lieuNaissance}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Nationalité
                                        </TableCell>
                                        <TableCell align="right">{data.nationalite}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Situation familliale
                                        </TableCell>
                                        <TableCell align="right">{data.situationFamilliale}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Pay de résidence
                                        </TableCell>
                                        <TableCell align="right">{data.country}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Ville de résidence
                                        </TableCell>
                                        <TableCell align="right">{data.ville}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Adresse postale
                                        </TableCell>
                                        <TableCell align="right">{data.adressePostale}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Direction générale
                                        </TableCell>
                                        <TableCell align="right">{data.directionGenerale}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Ville d'affectation
                                        </TableCell>
                                        <TableCell align="right">{data.villeAffectation}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Etablissement d'affectation
                                        </TableCell>
                                        <TableCell align="right">{
                                            etablissements.map(etab => {
                                                if(data.etablissementAffectation == etab.val){
                                                    return etab.eta
                                                }
                                            })
                                        }</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{flexGrow: 1, width:"100vh"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Les informations professionnelles</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid style={{width:"100%"}}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            Type vacataire
                                        </TableCell>
                                        <TableCell align="right">{data.typeVacataire}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Fonction exercé
                                        </TableCell>
                                        <TableCell align="right">{data.fonctionExercee}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Nom d'employeur
                                        </TableCell>
                                        <TableCell align="right">{data.employeur}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Adresse d'employeur
                                        </TableCell>
                                        <TableCell align="right">{data.adresseEmployeur}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Code postal
                                        </TableCell>
                                        <TableCell align="right">{data.codePostalEmployeur?data.codePostalEmployeur:"20201"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Nombre d'années expérience
                                        </TableCell>
                                        <TableCell align="right">{data.nombreAnneeExperience}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Spécialité du diplôme obtenu
                                        </TableCell>
                                        <TableCell align="right">{data.specialite}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Nombre d'heures de travail par semaine
                                        </TableCell>
                                        <TableCell align="right">{data.nombreHeuresTravail}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{flexGrow: 1, width:"100vh"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Les documents justificatifs</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid style={{width:"100%"}}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            Autorisation de l'employeur principal
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudDownloadIcon />}
                                            >
                                                télécharger
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Attestation de travail récente ou attestation de pension (retraité)
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudDownloadIcon />}
                                            >
                                                télécharger
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Copie des diplômes obtenu Légalisés
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudDownloadIcon />}
                                            >
                                                télécharger
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Copie de CIN légalisé
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudDownloadIcon />}
                                            >
                                                télécharger
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Justificatifs d'expériences
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudDownloadIcon />}
                                            >
                                                télécharger
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Registre de commerce ou statut (gérant ou entrepreneur)
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudDownloadIcon />}
                                            >
                                                télécharger
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Déclaration CNSS ou autre régime de retraite
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudDownloadIcon />}
                                            >
                                                télécharger
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Attestation de RIB
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudDownloadIcon />}
                                            >
                                                télécharger
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <b>Vérifier tous les documents</b>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                className={classes.buttonValide}
                                                onClick={verifier}
                                                startIcon={!clicked?<VerifiedUserOutlinedIcon/>:!valide?<Progress/>:<CheckOutlinedIcon/>}
                                            >
                                                Vérifier
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            
            {/* //
            // */}
            
            {/* //
            // */}
            
            <Grid style={{marginBottom:20}}>
            <TextField
                id="outlined-multiline-static"
                label="Remarque"
                placeholder="Ajoutez une remarque"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                />
                    <Typography variant="h6" style={{marginTop:20, marginBottom:10}} className={classes.heading}>
                        Ajoutez les modules
                    </Typography>
                    <Paper component="ul" className={classes.paperChip}>
                    
                        {chipData.map((data) => (
                            <li key={data.key}>
                                <Chip
                                label={data.label}
                                onDelete={handleDelete(data)}
                                className={classes.chip}
                                />
                            </li>
                            )
                        )}
                    </Paper>
               
            </Grid>
            <Grid container direction="row" alignItem="center" justify="space_between" style={{marginBottom:20}}>
                <Button
                    component={AdapterLink} to="/dashboard"
                    variant="outlined"
                    className={classes.buttonValide}
                    onClick={valider}
                    style={{marginRight:25}}
                >
                    Valider
                </Button>
                <Button
                    component={AdapterLink} to="/dashboard"
                    variant="outlined"
                    className={classes.buttonInvalide}
                    onClick={reffuser}
                >
                    Réffuser
                </Button>
            </Grid>
            {/* //
            // */}
        </Container>
        :<></>
    )
}

export default AdminDashboard