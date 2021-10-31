import React, { useContext } from 'react';
import { CONFIG } from '../../config/config'
import { MainContext } from '../../context/MainContext';
import { useInput } from '../../hooks/useInput';
import { useHistory } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

import { 
    Typography, 
    Box, 
    Grid, 
    TextField, 
    Button,
    Link
} from '@mui/material'

const Signup = () => {

    let history = useHistory();

    const { dispatch } = useContext(MainContext);

    // keep track of the input states 
    // each keystroke (onChange event listener) is saved within the state
    const { value:firstname,          bind:bindFirstname        } = useInput('');
    const { value:lastname,           bind:bindLastname         } = useInput('');
    const { value:email,              bind:bindEmail            } = useInput('');
    const { value:password,           bind:bindPassword         } = useInput('');
    const { value:passwordRepeat,     bind:bindPasswordRepeat   } = useInput('');
  
    const buttonSignUp = (e) => {
        e.preventDefault();
        dispatch({type:'signup', user: { 
          firstname : firstname,
          lastname : lastname,  
          email : email, 
          isAuthenticated : false,
        }});
        history.push("/");    
    }

    const redirectPage = (link) => history.push(link);
    return (
    <Grid container spacing={4}
          direction="column"
          alignItems="center">
      <Grid item square>           
        <Typography sx={{ mt:6, mb:8 }}  component="h1" variant="h5" align="center">
          <AddIcon align="center" /> Nouveau compte
        </Typography>
      
        <form noValidate>
        <Grid container columnSpacing={2} justifyContent="space-between">
          <Grid item xs>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="Prénom"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              { ...bindFirstname } 
            />
          </Grid>
          <Grid item xs>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Nom"
              name="lastname"
              autoComplete="lastname"
              { ...bindLastname } 
            />
          </Grid>
        </Grid>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Adresse e-mail"
          name="email"
          autoComplete="email"
          { ...bindEmail } 
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type="password"
          id="password"
          autoComplete="current-password"
          { ...bindPassword } 
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="passwordRepeat"
          label="Répéter le mot de passe"
          type="passwordRepeat"
          id="passwordRepeat"
          autoComplete="repeated-password"
          { ...bindPasswordRepeat } 
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick= { buttonSignUp }
        >
          S'inscrire
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" onClick={ () => redirectPage(CONFIG.signin_url)}>
              {"Se connecter"}
            </Link>
          </Grid>
          <Grid item >
          <Link href="#" variant="body2" onClick={ () => redirectPage(CONFIG.lost_password_url)}>
              {"Mot de passe oublié ?"}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
        </form>
      </Grid>
    </Grid>  
    );
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://heig-vd.ch//">
          HEIG-VD
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default Signup;