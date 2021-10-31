import React, { useContext } from 'react';
import { CONFIG, Get } from '../../config/config'
import { MainContext } from '../../context/MainContext';
import { useInput } from '../../hooks/useInput';
import { useHistory } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

import { 
    Typography, 
    Box, 
    Grid, 
    TextField, 
    FormControlLabel, 
    Checkbox,
    Button,
    Link
} from '@mui/material'

const SignIn = () => {

    let history = useHistory();

    const { dispatch } = useContext(MainContext);

    // keep track of the input states 
    // each keystroke (onChange event listener) is saved within the state
    const { value:email,        bind:bindEmail      } = useInput('');
    const { value:password,     bind:bindPassword   } = useInput('');
  
    const buttonSignIn = async (e) => {
      e.preventDefault();
      let response = Get(CONFIG.api_url);
      dispatch({type:'login', user: { email : response.email, isAuthenticated : true }});  
      history.push("/");    
    }

    const redirectPage = (link) => history.push(link);
    return (
        <Grid container 
            direction="column"
            alignItems="center"
            spacing={4}
            >
            <Grid item square>
            <Typography sx={{ mt:6, mb:8 }} component="h1" variant="h5" align="center">
              <LoginIcon align="center" /> Connection
            </Typography>
            
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse e-mail"
                name="email"
                autoComplete="email"
                autoFocus
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" defaultChecked  />}
                label="Se souvenir de moi"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick= { buttonSignIn }
              >
                Se connecter
              </Button>
              <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2" onClick={ () => redirectPage(CONFIG.lost_password_url)}>
                    {"Mot de passe oublié ?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={ () => redirectPage(CONFIG.signup_url)}>
                    {"S'inscrire"}
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

  export default SignIn;