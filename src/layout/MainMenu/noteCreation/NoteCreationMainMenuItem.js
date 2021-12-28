import React, { useState } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FolderCreationModal from './NoteCreationModal';

/**
 * This component is a item in the menu which show the modal for the creation of note
 */
export default function NoteCreationMainMenuItem() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <ListItem
                onClick={() => setShowModal(true)}
                button
                secondaryAction={<NoteAddIcon />}
                data-testid="MainMenu-directoryItem"
            >
                <ListItemText primary="Nouvelle note" secondary="Créer un nouvelle note" />
            </ListItem>
            <FolderCreationModal showModal={showModal} onClose={setShowModal} />
        </>
    );
}
