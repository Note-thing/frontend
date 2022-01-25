import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import {
    Typography, Box, Grid, TextField, Button, Link
} from '@mui/material';
import PasswordStrengthBar from 'react-password-strength-bar';
import { CONFIG, Post } from '../../config/config';
import { MainContext } from '../../context/MainContext';
import useInput from '../../hooks/useInput';
import { validatePassword } from './inputValidation';

const ChangePassword = () => {
    const history = useHistory();

    const { dispatch } = useContext(MainContext);
    // keep track of the input states
    // each keystroke (onChange event listener) is saved within the state
    const { value: password, bind: bindPassword, setError: setPasswordError } = useInput('');
    const { value: passwordRepeat, bind: bindPasswordRepeat, setError: setPasswordRepeatError } = useInput('');

    const buttonChangePassword = async (e) => {
        e.preventDefault();
        let valid = true;
        if (!validatePassword(password)) {
            setPasswordError({
                error: true,
                helperText: 'Password is invalid'
            });
            valid = false;
        }
        if (password !== passwordRepeat) {
            setPasswordRepeatError({
                error: true,
                helperText: 'Repeat password missmatch'
            });
            valid = false;
        }
        if (!valid) {
            return;
        }

        const urlSearchParams = new URLSearchParams(window.location.search);
        const { token } = Object.fromEntries(urlSearchParams.entries());
        try {
            await Post('/password/reset', {
                password,
                password_token: token
            });
            dispatch({
                type: 'dialog',
                dialog: {
                    id: 'signup_success',
                    severity: 'info',
                    is_open: true
                }
            });
        } catch (error) {
            dispatch({
                type: 'dialog',
                dialog: {
                    id: 'forgot_reset_failed',
                    severity: 'error',
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
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <Typography
                    sx={{ mt: 6, mb: 8 }}
                    component="h1"
                    variant="h5"
                    align="center"
                >
                    <LockIcon align="center" />
                    {' '}
                    Changer le mot de passe...
                </Typography>

                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Nouveau mot de passe"
                        name="password"
                        type="password"
                        autoComplete="password"
                        autoFocus
                        {...bindPassword}
                    />
                    <PasswordStrengthBar password={password} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="passwordRepeat"
                        label="Répéter"
                        name="passwordRepeat"
                        type="password"
                        autoComplete="passwordRepeat"
                        {...bindPasswordRepeat}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={buttonChangePassword}
                    >
                        Changer
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Button
                                variant="body2"
                                onClick={() => redirectPage(CONFIG.signin_url)}
                            >
                                Se connecter ?
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
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

export default ChangePassword;
