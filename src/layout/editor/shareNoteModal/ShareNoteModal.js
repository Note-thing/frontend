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
import { Alert, Grow } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '../../common/Modal';
import {
    CONFIG, Delete, Get, Post
} from '../../../config/config';
import { MainContext } from '../../../context/MainContext';
import { NoteContext } from '../../../context/NoteContext';

export default function ShareNoteModal({ open, setOpen }) {
    const [sharedNotesList, setSharedNotesList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isCreatingSharedNote, setIsCreatingSharedNote] = useState(false);
    const [isDeletingSharedNote, setIsDeletingSharedNote] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const { dispatch } = useContext(MainContext);
    const { notes } = useContext(NoteContext);
    useEffect(() => {
        (async () => {
            if (notes.note.id) {
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
    }, [notes.note.id]);
    const displaySpinner = () => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
    const generateLink = (sharedNote) => `${CONFIG.shared_note_url}/${sharedNote.uuid}`;

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
    const deleteBtnHandler = async (sharedNote) => {
        setIsDeletingSharedNote(true);
        await Delete(`/shared_notes/${sharedNote.id}`);
        setSharedNotesList(sharedNotesList.filter((note) => note.id !== sharedNote.id));
        setIsDeletingSharedNote(false);
    };

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
    const createNewSharedNote = async () => {
        setIsCreatingSharedNote(true);
        try {
            const newSharedNotes = await Post('/shared_notes', { id: notes.note?.id });
            setSharedNotesList([newSharedNotes, ...sharedNotesList]);
        } catch (err) {
            dispatch({ type: 'dialog', dialog: { id: 'cannotCopySharedNote', is_open: true } });
        }
        setIsCreatingSharedNote(false);
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
            <Button onClick={() => createNewSharedNote()} disabled={isCreatingSharedNote}>
                {isCreatingSharedNote && <CircularProgress />}
                Générer un nouveau lien
            </Button>
        </Modal>
    );
}
