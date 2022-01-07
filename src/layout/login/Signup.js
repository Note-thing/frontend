import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
    Typography, Box, Grid, TextField, Button, FormControl
} from '@mui/material';
import PasswordStrengthBar from 'react-password-strength-bar';
import { CONFIG, Post } from '../../config/config';
import { MainContext } from '../../context/MainContext';
import useInput from '../../hooks/useInput';
import { validateName, validateEmail, validatePassword } from './inputValidation';

const Signup = () => {
    const history = useHistory();

    const { dispatch } = useContext(MainContext);

    // keep track of the input states
    // each keystroke (onChange event listener) is saved within the state
    const { value: firstname, bind: bindFirstname, setError: setFirstNameError } = useInput('');
    const { value: lastname, bind: bindLastname, setError: setLastNameError } = useInput('');
    const { value: email, bind: bindEmail, setError: setEmailError } = useInput('');
    const { value: password, bind: bindPassword, setError: setPasswordError } = useInput('');
    const { value: passwordRepeat, bind: bindPasswordRepeat, setError: setPasswordRepeatError } = useInput('');

    const buttonSignUp = async (e) => {
        e.preventDefault();
        let inputError = false;
        if (!validateName(firstname)) {
            setFirstNameError({
                error: true,
                helperText: 'First name is mandatory'
            });
            inputError = true;
        }
        if (!validateName(lastname)) {
            setLastNameError({
                error: true,
                helperText: 'Last name is mandatory'
            });
            inputError = true;
        }
        if (!validateEmail(email)) {
            setEmailError({
                error: true,
                helperText: 'Valid email adresse must be provided'
            });
            inputError = true;
        }
        if (!validatePassword(password)) {
            setPasswordError({
                error: true,
                helperText: 'Password is mandatory'
            });
            inputError = true;
        }
        if (!validatePassword(passwordRepeat)) {
            setLastNameError({
                error: true,
                helperText: 'Password repeat is mandatory'
            });
            inputError = true;
        }
        if (password !== passwordRepeat) {
            setPasswordRepeatError({
                error: true,
                helperText: 'Password repeat miss match'
            });
            inputError = true;
        }
        if (inputError) {
            return;
        }
        try {
            await Post('/signup', {
                email,
                firstname,
                lastname,
                password,
                password_confirmation: passwordRepeat
            });
            dispatch({
                type: 'dialog',
                dialog: {
                    id: 'signup_success',
                    is_open: true
                }
            });
        } catch (error) {
            // TODO: gestion erreur, à voir comment faire
            dispatch({
                type: 'dialog',
                dialog: {
                    id: 'signup_failed',
                    is_open: true,
                    info: error.getMessage().join('.\n')
                }
            });
            return;
        }
        setTimeout(() => history.push('/'), 2000);
    };

    const redirectPage = (link) => history.push(link);
    return (
        <Grid container spacing={4} direction="column" alignItems="center">
            <Grid item square>
                <Typography
                    sx={{ mt: 6, mb: 8 }}
                    component="h1"
                    variant="h5"
                    align="center"
                >
                    <AddIcon align="center" />
                    {' '}
                    Nouveau compte
                </Typography>

                <FormControl>
                    <Grid
                        container
                        columnSpacing={2}
                        justifyContent="space-between"
                    >
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
                                {...bindFirstname}
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
                                {...bindLastname}
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
                        autoComplete="new-password"
                        inputProps={{
                            autoComplete: 'new-password'
                        }}
                        {...bindPassword}
                    />
                    <PasswordStrengthBar password={password} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="passwordRepeat"
                        label="Répéter le mot de passe"
                        type="password"
                        id="passwordRepeat"
                        autoComplete="new-password"
                        {...bindPasswordRepeat}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={buttonSignUp}
                    >
                        S'inscrire
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                to={CONFIG.signin_url}
                                variant="body2"
                                // onClick={() => redirectPage(CONFIG.signin_url)}
                            >
                                Se connecter
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to={CONFIG.lost_password_url}
                                variant="body2"
                                // onClick={() => redirectPage(CONFIG.lost_password_url)}
                            >
                                Mot de passe oublié ?
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </FormControl>
            </Grid>
        </Grid>
    );
};

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://heig-vd.ch/">
                HEIG-VD
            </Link>
            {' '}
            {new Date().getFullYear()}
            .
        </Typography>
    );
}

export default Signup;
