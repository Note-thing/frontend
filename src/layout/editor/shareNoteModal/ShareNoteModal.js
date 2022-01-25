import React, { useState, useEffect, useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, FormControl, Grow, Select, InputLabel, MenuItem, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '../../common/Modal';
import { CONFIG, Delete, Get, Post } from '../../../config/config';
import { MainContext } from '../../../context/MainContext';
import { NoteContext } from '../../../context/NoteContext';
import { SHARED_NOTE_DEFAULT_TYPE, SHARED_NOTE_TYPE } from '../../sharedNote/SharedNoteTypes';
import NotFoundError from '../../../errors/NotFoundError';

export default function ShareNoteModal({ open, setOpen }) {
    const [sharedNotesList, setSharedNotesList] = useState([]);
    const [noteType, setNoteType] = useState(SHARED_NOTE_DEFAULT_TYPE);
    const [isFetching, setIsFetching] = useState(false);
    const [isCreatingSharedNote, setIsCreatingSharedNote] = useState(false);
    const [isDeletingSharedNote, setIsDeletingSharedNote] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const { dispatch } = useContext(MainContext);
    const { notes } = useContext(NoteContext);
    useEffect(() => {
        (async () => {
            if (notes.note.id && open) {
                try {
                    setIsFetching(true);
                    const sharedNotes = await Get(`/notes/${notes.note.id}/shared_notes`);
                    setSharedNotesList(sharedNotes);
                    setIsFetching(false);
                } catch (err) {
                    setIsFetching(false);
                }
            }
        })();
    }, [notes.note.id, open]);

    /**
     * Display a spinner
     * @returns JSX component
     */
    const displaySpinner = () => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
    const generateLink = (sharedNote) => `${CONFIG.shared_note_url}/${sharedNote.uuid}`;

    /**
     * Handle copy button click. It just copy the link
     * @param {Object} sharedNote to copy 
     */
    const copyLinkClickHandler = (sharedNote) => {
        if (isCopied) {
            return;
        }
        navigator.clipboard.writeText(generateLink(sharedNote));
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    /**
     * Delete a shared note link
     * @param {*} sharedNote the shared note to delete
     */
    const deleteBtnHandler = async (sharedNote) => {
        setIsDeletingSharedNote(true);
        try {
            await Delete(`/shared_notes/${sharedNote.id}`);
            setSharedNotesList(sharedNotesList.filter((note) => note.id !== sharedNote.id));
        } catch (err) {
            if (err instanceof NotFoundError) {
                // The link has been used and be deleted. Not need to frighten
                // the user with error message.
                setSharedNotesList(sharedNotesList.filter((note) => note.id !== sharedNote.id));
            } else {
                dispatch({
                    type: 'dialog',
                    dialog: { id: '   shared_not_link_cannot_be_deleted', is_open: true }
                });
            }
        }
        setIsDeletingSharedNote(false);
    };

    /**
     * Return the shared notes list (JSX) if not empty otherwise a string telling it's empty.
     * @returns JSX or string depending if shared note links exists or note
     */
    const displayNotesList = () => {
        if (sharedNotesList.length > 0) {
            return (
                <List dense={false} sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                    {sharedNotesList
                        .sort((a, b) => a.created_at < b.created_at)
                        .map((sharedNote) => (
                            <ListItem
                                key={`sharednote-${sharedNote.id}`}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        disabled={isDeletingSharedNote}
                                        onClick={() => deleteBtnHandler(sharedNote)}
                                    >
                                        {isDeletingSharedNote ? (
                                            <CircularProgress />
                                        ) : (
                                            <DeleteIcon />
                                        )}
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => copyLinkClickHandler(sharedNote)}
                                >
                                    <Avatar>
                                        <CopyIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={generateLink(sharedNote)}
                                    secondary={`${sharedNote.title} ${sharedNote.created_at}`}
                                />
                            </ListItem>
                        ))}
                </List>
            );
        }
        return 'Aucune partage effectué pour le moment';
    };

    /**
     * Create a shared note link.
     */
    const createNewSharedNote = async () => {
        setIsCreatingSharedNote(true);
        try {
            const newSharedNotes = await Post('/shared_notes', {
                note_id: notes.note?.id,
                sharing_type: noteType.key
            });
            setSharedNotesList([newSharedNotes, ...sharedNotesList]);
        } catch (err) {
            dispatch({ type: 'dialog', dialog: { id: 'cannotCopySharedNote', severity: 'error', is_open: true } });
        }
        setIsCreatingSharedNote(false);
    };

    /**
     * Handle change of the type of shared note. (copy, mirror or readonly). The type is then used 
     * when generating a new shared link.
     * @param {Event} ev
     */
    const handleNoteTypeChange = (ev) => {
        const type = Object.values(SHARED_NOTE_TYPE).find((t) => t.key === ev.target.value);
        setNoteType(type);
    };
    return (
        <Modal title="Partager votre note" open={open} onClose={setOpen}>
            <Grow in={isCopied}>
                <Alert
                    sx={{
                        height: isCopied ? '100%' : 0
                    }}
                >
                    Lien copié !
                </Alert>
            </Grow>
            {isFetching ? displaySpinner() : displayNotesList()}
            <Grid container mt={5}>
                <Grid item xs={8}>
                    <FormControl
                        variant="standard"
                        sx={{ width: '95%', paddingRight: '10px' }}
                        mr={6}
                    >
                        <InputLabel id="note-type-select-label">Type de la note</InputLabel>
                        <Select
                            labelId="note-type-select-label"
                            value={noteType.key}
                            onChange={handleNoteTypeChange}
                            label="Note Type"
                        >
                            {Object.values(SHARED_NOTE_TYPE).map((type) => (
                                <MenuItem value={type.key}>{type.display}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} sx={{ maxHeight: '10px' }}>
                    <Button
                        variant="outlined"
                        onClick={() => createNewSharedNote()}
                        disabled={isCreatingSharedNote}
                    >
                        {isCreatingSharedNote && <CircularProgress />}
                        Générer un lien
                    </Button>
                </Grid>
            </Grid>
        </Modal>
    );
}
