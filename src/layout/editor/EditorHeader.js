import React, {
    useState, useContext, useEffect, useCallback
} from 'react';

import {
    Grid, TextField, Button, IconButton
} from '@mui/material';
import { Share, Delete as DeleteIcon } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Code } from '../../resource/icons/editor-viewmode-code.svg';
import { ReactComponent as View } from '../../resource/icons/editor-viewmode-view.svg';
import { ReactComponent as Split } from '../../resource/icons/editor-viewmode-split.svg';

import ShareNoteModal from './shareNoteModal/ShareNoteModal';
import ConfirmationModal from '../common/ConfirmationModal';
import { NoteContext } from '../../context/NoteContext';
import { MainContext } from '../../context/MainContext';
import { Delete, Patch } from '../../config/config';
import { debounceInput } from '../../utils/utils';
import EditorDownloadPDF from './EditorDownloadPDF';

/**
 * Header of the editor containing the note menu (display switch, PDF export, delete the note etc.).
 * @returns
 */
export default function EditorHeader({ setPreviewWidth }) {
    const [showShareModal, setShowShareModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { notes, dispatch: noteDispatch } = useContext(NoteContext);
    const { dispatch: mainDispatch } = useContext(MainContext);
    const [noteTitle, setNoteTitle] = useState('');
    const history = useHistory();
    const handleViewModeClick = (width) => setPreviewWidth(width);
    const handleNoteSuppression = useCallback(async () => {
        try {
            await Delete(`/notes/${notes.note.id}`, {});
            const { directory } = notes;
            directory.notes = directory.notes.filter((note) => note.id !== notes.note.id);
            noteDispatch({ type: 'update_directory', directory });
            setShowDeleteModal(false);
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'delete_note_succeed', is_open: true }
            });
            history.push(`/directory/${notes.directory.id}`);
        } catch (err) {
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'delete_note_failed', is_open: true }
            });
        }
    }, [notes, noteDispatch, mainDispatch]);

    const debounceTitle = useCallback(debounceInput(async (value) => {
        if (value.length === 0) {
            return;
        }
        try {
            const note = await Patch(`/notes/${notes.note.id}`, { title: value });
            const oldNote = notes.note;
            noteDispatch({ type: 'update_note', note: { ...oldNote, ...note } });
        } catch (err) {
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'update_name_note', is_open: true }
            });
        }
    }), [notes, noteDispatch, mainDispatch, debounceInput]);

    const handleChangeTitle = async (ev) => {
        setNoteTitle(ev.target.value);
        debounceTitle(ev.target.value);
    };

    useEffect(() => {
        setNoteTitle(notes.note.title);
    }, [notes.note.title]);
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
                onChange={handleChangeTitle}
                placeholder="Titre de la note"
                variant="standard"
                data-testid="note-title-input"
            />

            <Grid display="flex" justifyContent="space-around" width="10%">
                <IconButton
                    color="primary"
                    label="Partager la note"
                    onClick={() => {
                        setShowShareModal(!showShareModal);
                    }}
                >
                    <Share />
                </IconButton>

                <EditorDownloadPDF
                    className="menu-icon-item"
                    noteTitle={noteTitle}
                />

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
