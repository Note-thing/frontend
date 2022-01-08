import React, { useState, useContext } from 'react';
import {
    TextField, Button, Alert, Grid
} from '@mui/material';
import CustomModal from '../../common/Modal';
import { Post } from '../../../config/config';
import HttpError from '../../../errors/HttpError';
import { NoteContext } from '../../../context/NoteContext';

/**
 * Modal for creating a new folder
 * @param {Object} props : showModal if the modal should be displayed, onClose fn to close the
 * modal
 * @returns
 */
export default function FolderCreationModal({ showModal, onClose }) {
    const [newFolderName, setNewFolderName] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(NoteContext);
    const handleNewFolderNameChange = (ev) => {
        setNewFolderName(ev.target.value);
    };

    /**
     * Check the text input and send a request to create the folder.
     * @returns
     */
    const handleFolderCreationFolder = async () => {
        setError('');

        if (newFolderName === '') {
            setError('Ne peut pas être vide');
            return;
        }
        if (newFolderName.length > 50) {
            setError('Ne doit pas dépasser 50 caractères');
            return;
        }
        try {
            const response = await Post('/folders', { title: newFolderName });
            dispatch({
                type: 'update_directory',
                directory: response
            });
            onClose(false);
        } catch (err) {
            // TODO should probably use
            if (err instanceof HttpError) {
                setError(err.getMessage());
            }
        }
    };
    return (
        <CustomModal
            title="Nouveau dossier"
            open={showModal}
            onClose={onClose}
            testid="folder-creation-modal"
        >
            <Grid container spacing={2}>
                <Grid item md={12} justifyContent="center">
                    {error !== '' && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item md={12}>
                    <TextField
                        variant="outlined"
                        sx={{ width: '100%' }}
                        label="Nom du dossier"
                        placeholder="Entrez le nom du dossier"
                        value={newFolderName}
                        onChange={handleNewFolderNameChange}
                        data-testid="folder-creation-input"
                    />
                </Grid>
                <Grid item md={12}>
                    <Button
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onClick={handleFolderCreationFolder}
                        data-testid="folder-creation-button"
                    >
                        Créer
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
}
