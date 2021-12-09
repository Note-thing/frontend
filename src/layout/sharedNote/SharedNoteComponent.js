import React, { useEffect, useState, useContext, useRef } from 'react';
import {
    CircularProgress,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Grid
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Get, Post } from '../../config/config';
import { NoteContext } from '../../context/NoteContext';

/**
 * Ce composant est affiché dans la partie central de l'application. Elle permet de pouvoir
 * choisir où est-ce qu'on souhaite copié une shared note.
 */
export default function SharedNoteComponent() {
    const [isCopying, setIsCopying] = useState(false);
    const [directory, setDirectory] = useState('');
    const [directoriesList, setDirectoriesList] = useState([]);
    const { notes, dispatch } = useContext(NoteContext);
    const { uuid } = useParams();
    const selectInput = useRef();

    useEffect(() => {
        setDirectoriesList(notes.directories);
    }, [notes.directories]);

    /**
     * Le but de cette methode est de récpérer la valeur du select input via la ref.
     * Nous ne pouvons pas utiliser le state comme nous n'avons aucune garantie qu'il est été mis à
     * jour avant le clique de notre bouton.
     * @returns id du
     */
    const getSelectValue = () => {
        const htmlItems = [...selectInput.current.children];
        return htmlItems.find((e) => e.localName === 'input').value;
    };
    const copyHandler = async () => {
        // Cannot use state since we have no garanty the state is updated.
        const folderId = getSelectValue();
        setIsCopying(true);
        const note = await Post(`/shared_notes/${uuid}/copy`, { folderId });
        const contextDirectory = directoriesList.find((dir) => dir.uniqid === folderId);
        if (contextDirectory !== undefined) {
            contextDirectory.notes.push(note);
            dispatch('update_directory', contextDirectory);
        }
        // TODO call context note pour ajouter la note
        setIsCopying(false);
    };
    const directoryChangedHandler = async (directoryId) => {
        const dir = directoriesList.find((d) => d.uniqid === directoryId);
        if (dir !== undefined) {
            setDirectory(dir);
        }
    };
    return (
        <Grid container p={4} orientation="column" spacing={2}>
            <Grid item md={12}>
                <h1>Copie d'une nouvelle note</h1>
            </Grid>
            <Grid item md={12}>
                <p>Veuillez choisir un dossier dans lequel copier votre note</p>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Dossier destination</InputLabel>
                    <Select
                        labelId="select-label"
                        ref={selectInput}
                        value={directory.uniqid}
                        label="Dossier de destination"
                        defaultValue=""
                        onChange={(ev) => directoryChangedHandler(ev.target.value)}
                    >
                        {directoriesList.map((dir, idx) => (
                            <MenuItem value={idx}>{dir.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={12}>
                <Button
                    sx={{ width: '100%' }}
                    variant="outlined"
                    onClick={copyHandler}
                    disabled={isCopying}
                >
                    {isCopying && <CircularProgress />}
                    Copier
                </Button>
            </Grid>
        </Grid>
    );
}
