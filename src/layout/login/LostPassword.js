import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
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
import { CONFIG } from '../../config/config';
import { MainContext } from '../../context/MainContext';
import useInput from '../../hooks/useInput';

const LostPassword = () => {
    const history = useHistory();

    const { dispatch } = useContext(MainContext);

    // keep track of the input states
    // each keystroke (onChange event listener) is saved within the state
    const { value: email, bind: bindEmail } = useInput('');

    const buttonLostPassword = (e) => {
        e.preventDefault();
        dispatch({
            type: 'login',
            user: { email, isAuthenticated: true }
        });
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
                    <HelpOutlineIcon align="center" />
                    {' '}
                    Perdu le mot de passe?
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={buttonLostPassword}
                    >
                        Envoyer
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

export default LostPassword;
