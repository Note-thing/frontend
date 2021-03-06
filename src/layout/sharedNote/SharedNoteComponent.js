import React, {
    useEffect, useState, useContext, useRef
} from 'react';
import {
    CircularProgress,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Grid,
    Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Post } from '../../config/config';
import { NoteContext } from '../../context/NoteContext';

/**
 * Ce composant est affiché dans la partie central de l'application. Elle permet de pouvoir
 * choisir où est-ce qu'on souhaite copié une shared note.
 */
export default function SharedNoteComponent() {
    const [isCopying, setIsCopying] = useState(false);
    const [hasBeenCopied, setHasBeenCopied] = useState(false);
    const [hasError, setHasError] = useState(false);
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
     * A noter que nous le mettons dans un tableau pour pouvoir utiliser la méthode find
     * inexistante sur le html collection
     * The purpose of the function is to get the value of the select (html element) via its ref.
     * @returns id du
     */
    const getSelectValue = () => [...selectInput.current.children].find((e) => e.localName === 'input').value;
    const copyHandler = async () => {
        // Cannot use state since we have no garanty the state is updated.
        const selectedFolderId = getSelectValue();
        if (selectedFolderId === '') {
            setHasError(true);
            return;
        }
        const folderId = directoriesList[selectedFolderId].id;
        setIsCopying(true);
        setHasError(false);
        try {
            const note = await Post(`/shared_notes/${uuid}/copy`, { folder_id: folderId });
            const contextDirectory = directoriesList.find((dir) => dir.id === folderId);
            if (contextDirectory !== undefined) {
                contextDirectory.notes.push(note);
                dispatch('update_directory', contextDirectory);
            }
            setHasBeenCopied(true);
        } catch (err) {
            setHasError(true);
        }
        setIsCopying(false);
    };
    const directoryChangedHandler = async (directoryId) => {
        const dir = directoriesList.find((d) => d.id === directoryId);
        if (dir !== undefined) {
            setDirectory(dir);
        }
    };
    const displaySucceedPage = () => (
        <Grid item md={12}>
            <Alert severity="success">La copie de la note a bien été effectuée</Alert>
        </Grid>
    );
    const displayForm = () => (
        <>
            {hasError && (
                <Grid item md={12} sx={{ color: 'red' }}>
                    <Alert severity="error">Un problème est survenu lors de la copie</Alert>
                </Grid>
            )}
            <Grid item md={12}>
                <p>Veuillez choisir un dossier dans lequel copier votre note</p>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Dossier destination</InputLabel>
                    <Select
                        labelId="select-label"
                        SelectDisplayProps={{ 'data-testid': 'select-dest-folder' }}
                        ref={selectInput}
                        value={directory.id}
                        label="Dossier de destination"
                        defaultValue=""
                        onChange={(ev) => directoryChangedHandler(ev.target.value)}
                    >
                        {directoriesList.map((dir, idx) => (
                            <MenuItem
                                key={dir.id}
                                value={idx}
                                data-testid={`folder-item-${dir.id}`}
                            >
                                {dir.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={12}>
                <Button
                    data-testid="shared-note-component-copy-button"
                    sx={{ width: '100%' }}
                    variant="outlined"
                    onClick={copyHandler}
                    disabled={isCopying || hasBeenCopied}
                >
                    {isCopying && <CircularProgress />}
                    Copier
                </Button>
            </Grid>
        </>
    );
    return (
        <Grid container p={4} orientation="column" spacing={2}>
            <Grid item md={12}>
                <h1>Copie d'une nouvelle note</h1>
            </Grid>
            {hasBeenCopied ? displaySucceedPage() : displayForm()}
        </Grid>
    );
}
