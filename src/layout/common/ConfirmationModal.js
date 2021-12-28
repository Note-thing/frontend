import React from 'react';
import { Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomModal from './Modal';

/**
 * This modal is used to confirme the choice of a user who is about to delete a folder or a note
 * @param {Object} props open : boolean if the modal is displayed, onClose: fn to close the modal,
 * onAccept: cb called when "supprimer" button is cliked
 * @returns
 */
export default function ConfirmationModal({ open, onClose, onConfirm }) {
    return (
        <CustomModal
            title="Etes vous sûr de vouloir supprimer ?"
            open={open}
            onClose={() => onClose(false)}
        >
            <Grid container>
                <Grid item>
                    <p>
                        Voulez-vous vraiment supprimer définitivement cet élément. Attention cette
                        action sera irrévocable
                    </p>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item mr={2}>
                            <Button
                                mr={5}
                                variant="outlined"
                                color="error"
                                onClick={() => onConfirm()}
                                startIcon={<DeleteIcon />}
                            >
                                Supprimer
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={() => onClose(false)}>
                                Annuler
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CustomModal>
    );
}
