import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import {
    Typography, Box, Grid, TextField, Button, Link
} from '@mui/material';
import { CONFIG } from '../../config/config';
import { MainContext } from '../../context/MainContext';
import { useInput } from '../../hooks/useInput';

const ChangePassword = () => {
    const history = useHistory();

    const { dispatch } = useContext(MainContext);

    // keep track of the input states
    // each keystroke (onChange event listener) is saved within the state
    const { value: password, bind: bindPassword } = useInput('');
    const { value: passwordRepeat, bind: bindPasswordRepeat } = useInput('');

    const buttonChangePassword = (e) => {
        e.preventDefault();

        history.push('/');
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
                        autoComplete="password"
                        autoFocus
                        {...bindPassword}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="passwordRepeat"
                        label="Répéter"
                        name="passwordRepeat"
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
                            <Link
                                href="#"
                                variant="body2"
                                onClick={() => redirectPage(CONFIG.signin_url)}
                            >
                                Se connecter ?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                href="#"
                                variant="body2"
                                onClick={() => redirectPage(CONFIG.signup_url)}
                            >
                                S'inscrire
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
