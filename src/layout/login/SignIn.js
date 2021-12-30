import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
} from '@mui/material';
import { CONFIG, Get, Post } from '../../config/config';
import { MainContext } from '../../context/MainContext';
import useInput from '../../hooks/useInput';

const SignIn = () => {
    const history = useHistory();

    const { main, dispatch } = useContext(MainContext);

    // keep track of the input states
    // each keystroke (onChange event listener) is saved within the state
    const { value: email, bind: bindEmail } = useInput('');
    const { value: password, bind: bindPassword } = useInput('');

    const buttonSignIn = async (e) => {
        e.preventDefault();
        let token = null;
        try {
            token = await Post(CONFIG.signin_url, { email, password });
        } catch (error) {
            // TODO: gestion erreur, à voir comment faire
            console.log('error', error);
            dispatch({
                type: 'dialog',
                dialog: { id: 'login_failed', is_open: true }
            });
        }

        console.log('token = ', token);
        if (token != null) {
            const tempUser = {
                email,
                isAuthenticated: true
            };

            localStorage.setItem('User', JSON.stringify({ ...main.user, ...tempUser }));
            localStorage.setItem('Token', token.token);

            dispatch({
                type: 'dialog',
                dialog: { id: 'login', is_open: true }
            });

            dispatch({
                type: 'login',
                user: tempUser
            });

            setTimeout(() => history.push('/'), 2000);
        }
    };

    const redirectPage = (link) => history.push(link);
    return (
        <Grid container direction="column" alignItems="center" spacing={4}>
            <Grid item square>
                <Typography
                    sx={{ mt: 6, mb: 8 }}
                    component="h1"
                    variant="h5"
                    align="center"
                >
                    <LoginIcon align="center" />
                    Connection
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
                        {...bindEmail}
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
                        {...bindPassword}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                defaultChecked
                            />
                        }
                        label="Se souvenir de moi"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={buttonSignIn}
                    >
                        Se connecter
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Button
                                variant="body2"
                                onClick={() => redirectPage(CONFIG.lost_password_url)}
                            >
                                Mot de passe oublié?
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                href="#"
                                variant="body2"
                                onClick={() => redirectPage(CONFIG.signup_url)}
                            >
                                S'inscrire
                            </Button>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://heig-vd.ch//">
                HEIG-VD
            </Link>
            {' '}
            {new Date().getFullYear()}
            .
        </Typography>
    );
}

export default SignIn;
