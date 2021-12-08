import React, { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { MainContext } from '../context/MainContext';

const Dialog = () => {
    const position = {
        vertical: 'bottom',
        horizontal: 'center'
    };
    const { main: { dialog }, dispatch } = useContext(MainContext);
    const handleClose = (which) => {
        dispatch({
            type: 'dialog',
            dialog: {
                ...dialog, ...which
            }
        });
    };

    return (
        <section>
            {
                dialog && dialog.id === 'logout'
                && (
                    <Snackbar
                        anchorOrigin={position}
                        open={dialog.is_open}
                        onClose={() => handleClose({ is_open: false })}
                        autoHideDuration={6000}
                    >
                        <Alert variant="filled" severity="info">
                            Déconnecté
                        </Alert>
                    </Snackbar>)
            }
            {
                dialog && dialog.id === 'login'
                && (
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
                )
            }
        </section>
    );
};

export default Dialog;
