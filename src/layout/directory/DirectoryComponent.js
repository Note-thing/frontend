import React, { useState, useContext, useEffect } from 'react';
import {
    Grid, TextField, Button, Alert, List
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { NoteContext } from '../../context/NoteContext';
import { Delete, Patch } from '../../config/config';
import { MainContext } from '../../context/MainContext';
import ConfirmationModal from '../common/ConfirmationModal';
import NoteCreation from '../note/NoteCreation';
/**
 * "Page" containing the directory settings: (Change directory name, delete directory)
 * @returns
 */
export default function DirectoryComponent() {
    const { notes, dispatch: dispatchNote } = useContext(NoteContext);
    const { dispatch: dispatchMain } = useContext(MainContext);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isUpdatingName, setIsUpdatingName] = useState(false);
    const [isDeletingFolder, setIsDeletingFolder] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const history = useHistory();
    useEffect(() => {
        setName(notes.directory.title);
    }, [notes.directory]);

    /**
     * Handle text input changes
     * @param {Event} event
     */
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    /**
     * Called when the "mettre à jour" button is clicked
     */
    const handleSaveName = async () => {
        setError('');
        if (name === '') {
            setError('Le nom ne peut pas être vide');
            return;
        }
        if (name.length > 50) {
            setError('Le nom ne peut pas être plus grand que 50 caractères');
            return;
        }
        setIsUpdatingName(true);
        try {
            const folder = await Patch(`/folders/${notes.directory.id}`, {
                title: name
            });
            const oldDir = notes.directory;
            dispatchNote({ type: 'update_directory', directory: { ...oldDir, ...folder } });
        } catch (err) {
            dispatchMain({ type: 'dialog', dialog: { id: 'cannotEditFolder', is_open: true } });
        }

        setIsUpdatingName(false);
    };

    /**
     * Called when the delete button is pressed
     */
    const handleDeleteDirectory = async () => {
        setIsDeletingFolder(true);
        try {
            await Delete(`/folders/${notes.directory.id}`);

            dispatchNote({ type: 'update_directory', directory: notes.directory });
            history.push('/');
        } catch (err) {
            dispatchMain({ type: 'dialog', dialog: { id: 'cannotDeleteFolder', is_open: true } });
        }
        setIsDeletingFolder(false);
    };

    return (
        <Grid container direction="column" pl={2} pr={2}>
            <ConfirmationModal
                testid="folder-setting-confirmation-modal"
                open={showConfirmationModal}
                onClose={setShowConfirmationModal}
                onConfirm={() => {
                    setShowConfirmationModal(false);
                    handleDeleteDirectory();
                }}
            />
            <h3>{notes.directory.title}</h3>
            <Grid item>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <List>
                            <NoteCreation />
                        </List>
                    </Grid>
                    <Grid item>
                        <h3>Changement du nom</h3>
                    </Grid>
                    <Grid item>
                        {error && (
                            <Grid item md={12} sx={{ color: 'red' }}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        )}
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-basic"
                            label="Nom du dossier"
                            variant="outlined"
                            value={name}
                            onChange={handleNameChange}
                            data-testid="folder-setting-title-input"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={isUpdatingName}
                            color="success"
                            variant="outlined"
                            onClick={handleSaveName}
                            data-testid="folder-setting-name-saveBtn"
                        >
                            Mettre à jour le nom
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <hr />
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <h3>Suppression du dossier</h3>
                    </Grid>
                    <Grid item>
                        <p>Attention cette action est irrévocable</p>
                        <Button
                            disabled={isDeletingFolder}
                            variant="outlined"
                            color="error"
                            onClick={() => setShowConfirmationModal(true)}
                            data-testid="folder-setting-delete-btn"
                        >
                            Supprimer le dossier
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
