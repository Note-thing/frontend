import React, { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { MainContext } from '../context/MainContext';

const Dialog = () => {
    const position = {
        vertical: 'bottom',
        horizontal: 'center'
    };
    const {
        main: { dialog },
        dispatch
    } = useContext(MainContext);
    const handleClose = (which) => {
        dispatch({
            type: 'dialog',
            dialog: {
                ...dialog,
                ...which
            }
        });
    };

    return (
        <section>
            {dialog && dialog.id === 'logout' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        Déconnecté
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'login' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        Login success
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'login_failed' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Login failed
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'signup_failed' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Signup failed.
                        <br />
                        {dialog.info}
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'signup_success' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        Signup successful. Please login.
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'forgot_email_sent' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        A link to reset your password has been sent.
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'forgot_email_failed' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Email to reset your password could not be sent.
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'forgot_reset_success' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        Your password has been reset successfully.
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'forgot_reset_failed' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Your password could not be reset.
                        <br />
                        {dialog.info}
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'copySharedNoteSucceed' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        Votre note a bien été copié !
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'cannotCopySharedNote' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        Un problème est survenu lors de la copie de votre note
                    </Alert>
                </Snackbar>
            )}

            {dialog && dialog.id === 'cannotDeleteFolder' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Un problème est survenu lors de la suppression du dossier
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'cannotEditFolder' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Un problème est survenu lors de la mise à jour du dossier
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'update_name_note' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Impossible de modifier le nom de la note
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'update_body_note' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Impossible de modifier le body de la note
                    </Alert>
                </Snackbar>
            )}

            {dialog && dialog.id === 'create_note' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        La note a été créée
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'delete_note_succeed' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        Note supprimé correctement
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'delete_note_failed' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Impossible de supprimer la Note
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'profil_update_success' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="info">
                        Votre profil a bien été mis à jour
                    </Alert>
                </Snackbar>
            )}
            {dialog && dialog.id === 'profil_update_failed' && (
                <Snackbar
                    anchorOrigin={position}
                    open={dialog.is_open}
                    onClose={() => handleClose({ is_open: false })}
                    autoHideDuration={6000}
                >
                    <Alert variant="filled" severity="error">
                        Erreur pendant la modification de profil
                        <br />
                        {dialog.info}
                    </Alert>
                </Snackbar>
            )}


        </section>
    );
};

export default Dialog;
