import React, { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { MainContext } from '../context/MainContext';

const position = {
    vertical: 'bottom',
    horizontal: 'center'
};

const DialogWrapper = ({ dialog: { is_open, severity, info }, text, handleClose }) => (
    <Snackbar
        anchorOrigin={position}
        open={is_open}
        onClose={() => handleClose({ is_open: false })}
        autoHideDuration={6000}
    >
        <Alert variant="filled" severity={severity}>
            {text}
            {info && <br />}
        </Alert>
    </Snackbar>
);

const getText = (dialogId) => {
    switch (dialogId) {
        case 'logout':
            return 'Déconnecté';
        case 'login':
            return 'Login réussi';
        case 'login_failed':
            return 'Login incorrecte';
        case 'signup_failed':
            return 'Création du compte a échoué';
        case 'signup_success':
            return 'Création du compte est réussie. Vous devez valider votre adresse e-mail.';
        case 'forgot_email_sent':
            return 'Un lien pour réinitialiser votre mot de passe a été envoyé.';
        case 'forgot_email_failed':
            return "L'e-mail pour réinitialiser votre mot de passe n'a pas pu être envoyé.";
        case 'forgot_reset_success':
            return 'Votre mot de passe a été réinitialisé avec succès.';
        case 'forgot_reset_failed':
            return "Votre mot de passe n'a pas pu être réinitialisé.";
        case 'copySharedNoteSucceed':
            return 'Votre note a bien été copié !';
        case 'cannotCopySharedNote':
            return 'Un problème est survenu lors de la copie de votre note';
        case 'cannotDeleteFolder':
            return 'Un problème est survenu lors de la suppression du dossier';
        case 'cannotEditFolder':
            return 'Un problème est survenu lors de la mise à jour du dossier';
        case 'update_name_note':
            return 'Impossible de modifier le nom de la note';
        case 'update_body_note':
            return 'Impossible de modifier le body de la note';
        case 'create_note':
            return ' La note a été créée';
        case 'delete_note_succeed':
            return 'Note supprimé correctement';
        case 'delete_note_failed':
            return 'Impossible de supprimer la Note';
        case 'account_validate_success':
            return 'Votre compte a bien été validé';
        case 'account_validate_failed':
            return 'Erreur pendant la validation du compte';
        case 'account_validate_missing_token':
            return 'Token de validation invalide';
        case 'missing_ressource':
            return "La ressource que vous tentez d'accéder n'existe pas";
        case 'tag_delete_failed':
            return 'Impossible de supprimer le tag';
        case 'tag_add_failed':
            return "Impossible d'ajouter le tag";
        case 'lock_failed':
            return 'La note est déjà verrouiller';
        case 'unlock_note':
            return 'Note déverrouillée pour les autre';
        case 'lock_note':
            return 'Note déverrouillée';
        case 'sync_note':
            return 'Note synchronisée';
        case 'sync_note_failed':
            return 'Un problème est survenue pendant la synchronisation de la note';
        case 'unlock_failed':
            return 'Déverrouillage impossible.';
        case 'delete_locked_note_failed':
            return "La note est verrouiller par quelqu'un d' autre et donc ne peut etre supprimée";
        case 'profil_update_success':
            return 'Profil mise à jour';
        case 'profil_update_failed':
            return 'La mise à jour du profil a échouée';
        default:
            return 'Une erreur inconnue est survenue';
    }
};

const Dialog = () => {
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
            {dialog && (
                <DialogWrapper
                    dialog={dialog}
                    text={getText(dialog.id)}
                    handleClose={handleClose}
                />
            )}
        </section>
    );
};

export default Dialog;
