import React, { useState, useContext } from 'react';
import {
    Grid, Input, Button
} from '@mui/material';
import { PictureAsPdf, Share, Delete as DeleteIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { ReactComponent as Code } from '../../resource/icons/editor-viewmode-code.svg';
import { ReactComponent as View } from '../../resource/icons/editor-viewmode-view.svg';
import { ReactComponent as Split } from '../../resource/icons/editor-viewmode-split.svg';
import ShareNoteModal from './shareNoteModal/ShareNoteModal';
import ConfirmationModal from '../common/ConfirmationModal';
import { NoteContext } from '../../context/NoteContext';
import { MainContext } from '../../context/MainContext';
import { Delete } from '../../config/config';
/**
 * Header of the editor containing the note menu (display switch, PDF export, delete the note etc.).
 * @returns
 */
export default function EditorHeader({ setPreviewWidth }) {
    const [showShareModal, setShowShareModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { notes, dispatch: noteDispatch } = useContext(NoteContext);
    const { dispatch: mainDispatch } = useContext(MainContext);
    const handleViewModeClick = (width) => setPreviewWidth(width);
    const handleNoteSuppression = async () => {
        try {
            await Delete(`/notes/${1}`, {});
            const { directory } = notes;
            directory.notes = directory.notes.filter((note) => note.id !== notes.note.id);
            noteDispatch({ type: 'update_directory', directory });
            setShowDeleteModal(false);
        } catch (err) {
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'Impossible de supprimer la note note', is_open: true }
            });
        }
    };
    return (
        <Grid
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="0 1rem 0 1rem"
            borderBottom="0.1rem solid #e9f0f0"
        >
            <ShareNoteModal open={showShareModal} setOpen={setShowShareModal} />
            <ConfirmationModal
                open={showDeleteModal}
                onClose={setShowDeleteModal}
                onConfirm={() => {
                    handleNoteSuppression();
                }}
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

            <Input
                className="noBorderInput"
                sx={{ width: '10rem', fontSize: '1.2rem' }}
                value="07.11.2021"
                placeholder="Titre de la note"
            />

            <Grid display="flex" justifyContent="space-around" width="10%">
                <Share
                    className="menu-icon-item"
                    onClick={() => {
                        setShowShareModal(!showShareModal);
                    }}
                    sx={{ cursor: 'pointer' }}
                />

                <PictureAsPdf
                    className="menu-icon-item"
                    sx={{ curosr: 'pointer' }}
                    onClick={() => 'TODO'}
                />
                <DeleteIcon
                    className="menu-icon-item"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setShowDeleteModal(true)}
                />
            </Grid>
        </Grid>
    );
}

EditorHeader.propTypes = {
    setPreviewWidth: PropTypes.func.isRequired
};
