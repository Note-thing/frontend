import React, { useState, useContext } from 'react';
import {
    TextField, Button, Alert, Grid
} from '@mui/material';
import CustomModal from '../../common/Modal';
import { Post } from '../../../config/config';
import HttpError from '../../../errors/HttpError';
import { NoteContext } from '../../../context/NoteContext';

/**
 * Modal for creating a new note
 * @param {Object} props : showModal if the modal should be displayed, onClose fn to close the
 * modal
 * @returns
 */
export default function NoteCreationModal({ showModal, onClose }) {
    const [newNoteName, setNewNoteName] = useState('');
    const [error, setError] = useState('');
    const {
        notes: {
            directory: { id: directoryid }
        },
        dispatch
    } = useContext(NoteContext);
    const handleNewNoteNameChange = (ev) => {
        setNewNoteName(ev.target.value);
    };

    /**
     * Check the text input and send a request to create the note.
     * @returns
     */
    const handleCreationNote = async () => {
        if (newNoteName === '') {
            setError('Ne peut pas être vide');
            return;
        }
        if (newNoteName.length > 50) {
            setError('Ne doit pas dépasser 50 caractère');
            return;
        }

        try {
            const response = await Post('/notes', { title: newNoteName, body: '', folder_id: directoryid });
            dispatch({
                type: 'update_note',
                note: response
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
        <CustomModal title="Nouvelle note" open={showModal} onClose={onClose}>
            <Grid container spacing={2}>
                <Grid item md={12} justifyContent="center">
                    {error !== '' && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item md={12}>
                    <TextField
                        variant="outlined"
                        sx={{ width: '100%' }}
                        label="Nom de la note"
                        placeholder="Entrez le nom de la note"
                        value={newNoteName}
                        onChange={handleNewNoteNameChange}
                    />
                </Grid>
                <Grid item md={12}>
                    <Button
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onClick={handleCreationNote}
                    >
                        Créer
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
}
