import React, { useState, useContext, useEffect, useCallback } from 'react';

import { Grid, TextField, Button, IconButton } from '@mui/material';
import { Share, Delete as DeleteIcon } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import LockOpen from '@mui/icons-material/LockOpen';
import Lock from '@mui/icons-material/Lock';
import SyncIcon from '@mui/icons-material/Sync';
import { ReactComponent as Code } from '../../resource/icons/editor-viewmode-code.svg';
import { ReactComponent as View } from '../../resource/icons/editor-viewmode-view.svg';
import { ReactComponent as Split } from '../../resource/icons/editor-viewmode-split.svg';

import ShareNoteModal from './shareNoteModal/ShareNoteModal';
import ConfirmationModal from '../common/ConfirmationModal';
import { NoteContext } from '../../context/NoteContext';
import { MainContext } from '../../context/MainContext';
import { Delete, Get, Patch } from '../../config/config';
import debounceInput from '../../utils/utils';
import EditorDownloadPDF from './EditorDownloadPDF';
import UnProcessableEntityError from '../../errors/UnprocessableEntityError';

/**
 * Header of the editor containing the note menu (display switch, PDF export, delete the note etc.).
 * @returns
 */
export default function EditorHeader({ setPreviewWidth }) {
    let pendingLockRequest = false; // This var is used to check if there is a lock request pending
    const [showShareModal, setShowShareModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [syncBtnDisabled, setSyncBtnDisabled] = useState(false);
    const [lockBtnDisabled, setLockBtnDisabled] = useState(false);
    const [lock, setLock] = useState(false);
    const { notes, dispatch: noteDispatch } = useContext(NoteContext);
    const { dispatch: mainDispatch } = useContext(MainContext);
    const [noteTitle, setNoteTitle] = useState('');
    const history = useHistory();
    const handleViewModeClick = (width) => setPreviewWidth(width);

    useEffect(() => {
        setNoteTitle(notes.note.title);
    }, [notes.note.title]);

    useEffect(() => {
        setLock(notes.note.lock || notes.note.read_only === true);
    }, [notes.note.lock, notes.note.read_only]);

    const handleNoteSuppression = useCallback(async () => {
        try {
            await Delete(`/notes/${notes.note.id}`, {});
            const { directory } = notes;
            directory.notes = directory.notes.filter((note) => note.id !== notes.note.id);
            noteDispatch({ type: 'update_directory', directory });
            setShowDeleteModal(false);
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'delete_note_succeed', severity: 'info', is_open: true }
            });
            history.push(`/directory/${notes.directory.id}`);
        } catch (err) {
            if (err instanceof UnProcessableEntityError) {
                mainDispatch({
                    type: 'dialog',
                    dialog: { id: 'delete_locked_note_failed', severity: 'error', is_open: true }
                });
            } else {
                mainDispatch({
                    type: 'dialog',
                    dialog: { id: 'delete_note_failed', severity: 'error', is_open: true }
                });
            }
        }
    }, [notes, noteDispatch, mainDispatch]);
    /**
     * Sync the note. Simply get the note with its last updates. No unlock, no lock
     */
    const syncNote = async () => {
        setSyncBtnDisabled(true);
        try {
            const note = await Get(`/notes/read_only/${notes.note.id}`);
            if (pendingLockRequest) {
                return;
            }
            noteDispatch({ type: 'update_note', note });
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'sync_note', severity: 'info', is_open: true }
            });
        } catch (err) {
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'sync_note_failed', severity: 'error', is_open: true }
            });
        }
        setSyncBtnDisabled(false);
    };
    const debounceTitle = useCallback(
        debounceInput(async (value) => {
            if (value.length === 0) {
                return;
            }
            try {
                const note = await Patch(`/notes/${notes.note.id}`, { title: value });
                noteDispatch({ type: 'update_note', note });
            } catch (err) {
                if (err instanceof UnProcessableEntityError) {
                    noteDispatch({
                        type: 'update_note',
                        note: { ...notes.note, lock: true }
                    });
                    mainDispatch({
                        type: 'dialog',
                        dialog: { id: 'locked_note', severity: 'error', is_open: true }
                    });
                    await syncNote();
                } else {
                    mainDispatch({
                        type: 'dialog',
                        dialog: { id: 'update_body_note', severity: 'error', is_open: true }
                    });
                }
            }
        }),
        [notes, noteDispatch, mainDispatch, debounceInput]
    );

    const handleChangeTitle = async (ev) => {
        setNoteTitle(ev.target.value);
        debounceTitle(ev.target.value);
    };

    /**
     * Lock the note for the other. If it succeed it will prevent anyone from modifying  the note
     */
    const lockForOther = async () => {
        try {
            pendingLockRequest = true;
            const note = await Get(`/notes/${notes.note.id}`);
            noteDispatch({ type: 'update_note', note });
            if (note.lock) {
                throw Error('note locked');
            }
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'lock_note', severity: 'info', is_open: true }
            });
        } catch (err) {
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'lock_failed', severity: 'error', is_open: true }
            });
        }
        pendingLockRequest = false;
    };

    /**
     * unLock the note for the other. If it succeed it will allow anyone from getting lock on the
     * note
     */
    const unlockForOther = async () => {
        try {
            await Get(`/notes/unlock/${notes.note.id}`);
            const { note } = notes;
            note.lock = true;
            noteDispatch({ type: 'update_note', note });
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'unlock_note', is_open: true }
            });
        } catch (err) {
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'unlock_failed', severity: 'error', is_open: true }
            });
        }
    };
    /**
     * Toggle the lock for the note
     */
    const toggleLock = async () => {
        setLockBtnDisabled(true);
        if (lock) {
            await lockForOther();
        } else {
            await unlockForOther();
        }
        setLockBtnDisabled(false);
    };

    /**
     * Display adequatly the buttons(sync, lock) depending on
     * the note mode(read only, shared, copied/normal)
     */
    const displaySharedNoteBtns = () => {
        const btns = [];
        if (notes.note?.has_mirror === true) {
            btns.push(
                <IconButton
                    color="primary"
                    label="Demander l'accès"
                    disabled={lockBtnDisabled}
                    onClick={toggleLock}
                >
                    {lock ? <Lock /> : <LockOpen />}
                </IconButton>
            );
        }
        if (notes.note?.has_mirror === true || notes.note.read_only === true) {
            btns.push(
                <IconButton
                    color="primary"
                    label="Synchronisation avec le cloud"
                    disabled={syncBtnDisabled || (!lock && notes.note.read_only !== true)}
                    onClick={syncNote}
                >
                    <SyncIcon />
                </IconButton>
            );
        }

        return btns;
    };

    /**
     * useEffect to set a interval which will update the note when locked
     * to let the user the modification done.
     */
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!lock || pendingLockRequest) {
                return;
            }
            syncNote();
        }, 10000);

        // Unsub interval
        return () => {
            clearInterval(intervalId);
        };
    }, [lock]);

    return (
        <Grid className="editor-header">
            <ShareNoteModal open={showShareModal} setOpen={setShowShareModal} />
            <ConfirmationModal
                open={showDeleteModal}
                onClose={setShowDeleteModal}
                onConfirm={() => {
                    handleNoteSuppression();
                }}
                testid="confirmation-modal"
            />
            <Grid display="flex" justifyContent="space-around">
                <Button size="small" onClick={() => handleViewModeClick(0)}>
                    <Code />
                </Button>
                <Button size="small" onClick={() => handleViewModeClick(50)}>
                    <Split />
                </Button>
                <Button size="small" onClick={() => handleViewModeClick(100)}>
                    <View />
                </Button>
            </Grid>

            <TextField
                helperText={noteTitle?.length === 0 && 'Titre obligatoire'}
                className="noBorderInput"
                sx={{ fontSize: '1.4rem', minWidth: '10rem', maxWidth: '20rem' }}
                size="medium"
                value={noteTitle}
                error={noteTitle?.length === 0}
                disabled={(lock && notes.note.has_mirror) || notes.note.read_only}
                onChange={handleChangeTitle}
                placeholder="Titre de la note"
                variant="standard"
                data-testid="note-title-input"
            />

            <Grid display="flex" justifyContent="space-around">
                {displaySharedNoteBtns()}
                <IconButton
                    color="primary"
                    label="Partager la note"
                    disabled={notes.note.reference_note !== null}
                    onClick={() => {
                        setShowShareModal(!showShareModal);
                    }}
                >
                    <Share />
                </IconButton>
                <EditorDownloadPDF className="menu-icon-item" noteTitle={noteTitle} />

                <IconButton
                    color="primary"
                    label="Supprimer la note"
                    onClick={() => setShowDeleteModal(true)}
                    data-testid="editor-header-delete-btn"
                >
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
