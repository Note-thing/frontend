import React, { useState, useContext, useEffect } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { NoteContext } from '../../context/NoteContext';
import { Delete, Patch } from '../../config/config';
import { MainContext } from '../../context/MainContext';

/**
 * "Page" containing the directory settings: (Change directory name, delete directory)
 * @returns
 */
export default function DirectorySettingsComponent() {
    const { notes, dispatch: dispatchNote } = useContext(NoteContext);
    const { dispatch: dispatchMain } = useContext(MainContext);
    const [name, setName] = useState('');
    useEffect(() => {
        setName(notes.directory.name);
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
        try {
            const folder = await Patch(`/folders/${notes.directory.id}`, {
                title: name
            });
            dispatchNote({ type: 'update_directory', directory: folder });
        } catch (err) {
            dispatchMain({ type: 'dialog', dialog: { id: 'cannotEditFolder', is_open: true } });
        }
    };

    /**
     * Called when the delete button is pressed
     */
    const handleDeleteDirectory = async () => {
        try {
            await Delete(`/folders/${notes.directory.id}`);
            dispatchNote({ type: 'update_directory', directory: notes.directory });
        } catch (err) {
            dispatchMain({ type: 'dialog', dialog: { id: 'cannotDeleteFolder', is_open: true } });
        }
    };

    return (
        <Grid container direction="column" ml={10} mr={5} mt={5}>
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
                        <Button color="success" variant="outlined" onClick={handleSaveName}>Mettre à jour le nom</Button>
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
                        <p>
                            Attention cette action est irrévocable
                        </p>
                        <Button variant="outlined" color="error" onClick={handleDeleteDirectory}>Supprimer le dossier</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
