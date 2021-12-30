import React, { useState } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderCreationModal from './FolderCreationModal';
/**
 * This component is a item in the menu which show the modal for the creation of folder
 */
export default function FolderCreationMainMenuItem() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <ListItem
                onClick={() => setShowModal(true)}
                button
                secondaryAction={<CreateNewFolderIcon />}
                data-testid="MainMenu-add-folder-btn"
            >
                <ListItemText primary="Nouveau dossier" secondary="Créer un nouveau dossier" />
            </ListItem>
            <FolderCreationModal showModal={showModal} onClose={setShowModal} />
        </>
    );
}
