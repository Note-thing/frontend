import React, { useContext } from 'react';
import { Grid, TextField, Button, FormControl } from '@mui/material';
import PasswordStrengthBar from 'react-password-strength-bar';
import { MainContext } from '../../context/MainContext';
import useInput from '../../hooks/useInput';
import { validateName, validateEmail } from '../common/inputValidation';
import { Patch } from '../../config/config';

const Profile = () => {
    const {
        main: { user },
        dispatch
    } = useContext(MainContext);

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

        if (inputError) {
            return;
        }
        try {
            const response = await Patch('/users', {
                email,
                firstname,
                lastname
            });
            delete response.password_digest;
            localStorage.setItem('User', JSON.stringify(response));
            dispatch({
                type: 'login',
                user: response
            });
            dispatch({
                type: 'dialog',
                dialog: {
                    id: 'profil_update_success',
                    severity: 'info',
                    is_open: true
                }
            });
        } catch (error) {
            dispatch({
                type: 'dialog',
                dialog: {
                    id: 'profil_update_failed',
                    is_open: true,
                    severity: 'error',
                    info: error.getMessage()
                }
            });
        }
    };
    return (
        <Grid container direction="column" pl={2} pr={2}>
            <h3>Mon profil</h3>
            <Grid item>
                <FormControl>
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
