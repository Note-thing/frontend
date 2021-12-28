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
import NotFoundError from '../../errors/NotFoundError';

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
     * @returns id du
     */
    const getSelectValue = () => [...selectInput.current.children].find((e) => e.localName === 'input').value;
    const copyHandler = async () => {
        // Cannot use state since we have no garanty the state is updated.
        const folderId = getSelectValue();
        setIsCopying(true);
        setHasError(false);
        try {
            const note = await Post(`/shared_notes/${uuid}/copy`, { folderId });
            const contextDirectory = directoriesList.find((dir) => dir.uniqid === folderId);
            if (contextDirectory !== undefined) {
                contextDirectory.notes.push(note);
                dispatch('update_directory', contextDirectory);
            }

            // // TODO : Stéfan, peux-tu réparer ça ?
            // dispatch({
            //     type: 'dialog',
            //     dialog: { id: 'copySharedNoteSucceed', is_open: true }
            // });
            setHasBeenCopied(true);
        } catch (err) {
            setHasError(true);
            if (err instanceof NotFoundError) {
                // dispatch({
                //     type: 'dialog',
                //     dialog: { id: 'cannotCopySharedNote', is_open: true }
                // });
            }
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
                        ref={selectInput}
                        value={directory.uniqid}
                        label="Dossier de destination"
                        defaultValue=""
                        onChange={(ev) => directoryChangedHandler(ev.target.value)}
                        SelectDisplayProps={{ 'data-testid': 'folder-dropdown' }}

                    >
                        {directoriesList.map((dir, idx) => (
                            <MenuItem key={dir.uniqid} value={idx} data-testid={`folder-item-${dir.uniqid}`}>
                                {dir.name}
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
