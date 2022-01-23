import React, { useContext } from 'react';
import {
    Grid, TextField, Button, FormControl
} from '@mui/material';
import PasswordStrengthBar from 'react-password-strength-bar';
import { MainContext } from '../../context/MainContext';
import useInput from '../../hooks/useInput';
import { validateName, validateEmail, validatePassword } from '../common/inputValidation';

const Profile = () => {
    const { main: { user }, dispatch } = useContext(MainContext);

    // keep track of the input states
    // each keystroke (onChange event listener) is saved within the state
    const {
        value: firstname,
        bind: bindFirstname,
        setError: setFirstNameError
    } = useInput(user.firstname);
    const {
        value: lastname,
        bind: bindLastname,
        setError: setLastNameError
    } = useInput(user.lastname);
    const { value: email, bind: bindEmail, setError: setEmailError } = useInput(user.email);
    const { value: password, bind: bindPassword, setError: setPasswordError } = useInput('');
    const { value: passwordRepeat, bind: bindPasswordRepeat, setError: setPasswordRepeatError } = useInput('');
    const buttonUpdate = async (e) => {
        e.preventDefault();
        let inputError = false;
        if (!validateName(firstname)) {
            setFirstNameError({
                error: true,
                helperText: 'Prénom est obligatoire'
            });
            inputError = true;
        }
        if (!validateName(lastname)) {
            setLastNameError({
                error: true,
                helperText: 'Nom de famille est obligatoire'
            });
            inputError = true;
        }
        if (!validateEmail(email)) {
            setEmailError({
                error: true,
                helperText: 'Un e-mail doit être fournis'
            });
            inputError = true;
        }

        if (password.length > 0) {
            if (!validatePassword(password)) {
                setPasswordError({
                    error: true,
                    helperText: 'Password valide est obligatoire'
                });
                inputError = true;
            }
            if (!validatePassword(passwordRepeat)) {
                setLastNameError({
                    error: true,
                    helperText: 'Répetez le password'
                });
                inputError = true;
            }
            if (password !== passwordRepeat) {
                setPasswordRepeatError({
                    error: true,
                    helperText: 'Les passwords ne correspondent pas'
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
            }
        }
    };
    return (
        <Grid container direction="column" pl={2} pr={2}>
            <h3>Mon profil</h3>
            <Grid item>
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
                        onClick={buttonUpdate}
                    >
                        Mettre à jour
                    </Button>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Profile;
