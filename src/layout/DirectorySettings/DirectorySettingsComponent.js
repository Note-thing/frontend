import React, { useState, useContext, useEffect } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { NoteContext } from '../../context/NoteContext';
import { Delete, Patch } from '../../config/config';
import { MainContext } from '../../context/MainContext';
import ConfirmationModal from '../common/ConfirmationModal';
/**
 * "Page" containing the directory settings: (Change directory name, delete directory)
 * @returns
 */
export default function DirectorySettingsComponent() {
    const { notes, dispatch: dispatchNote } = useContext(NoteContext);
    const { dispatch: dispatchMain } = useContext(MainContext);
    const [name, setName] = useState('');
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
        <Grid container direction="column" ml={10} mr={5} mt={5}>
            <ConfirmationModal
                open={showConfirmationModal}
                onClose={setShowConfirmationModal}
                onConfirm={() => {
                    setShowConfirmationModal(false);
                    handleDeleteDirectory();
                }}
            />
            <h1>{notes.directory.name}</h1>
            <Grid item>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <h3>Changement du nom</h3>
                    </Grid>
                    <Grid item>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-basic"
                            label="Nom du dossier"
                            variant="outlined"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={isUpdatingName}
                            color="success"
                            variant="outlined"
                            onClick={handleSaveName}
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
                        >
                            Supprimer le dossier
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
