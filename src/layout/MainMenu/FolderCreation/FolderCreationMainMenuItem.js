import React, { useState } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderCreationModal from './FolderCreationModal';

export default function FolderCreationMainMenuItem() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <ListItem
                onClick={() => setShowModal(true)}
                button
                secondaryAction={<AddIcon />}
                data-testid="MainMenu-directoryItem"
            >
                <ListItemText primary="Nouveau dossier" secondary="Créer un nouveau dossier" />
            </ListItem>
            <FolderCreationModal showModal={showModal} onClose={setShowModal} />
        </>
    );
}
