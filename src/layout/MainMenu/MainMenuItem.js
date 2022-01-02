import React, { useCallback, useContext } from 'react';
import {
    Chip,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    IconButton
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { KeyboardArrowRight } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { NoteContext } from '../../context/NoteContext';
import NoteCreationMainMenuItem from './noteCreation/NoteCreationMainMenuItem';

/**
 *
 * @param {Object} props the directory object and show, a boolean whether the item is collasped
 * or note
 */
export default function MainMenuItem({ directory, show }) {
    const history = useHistory();
    const {
        notes,
        dispatch
    } = useContext(NoteContext);

    /**
     * Handle directory click.
     */
    const handleDirectoryClick = useCallback(
        (id) => {
            console.log('handleDirectoryClick', id);
            const destDirectory = notes.directories.find((dir) => dir.id === id);
            dispatch({
                type: 'change_directory',
                directory: { ...destDirectory }
            });
            history.push(`/directory/${id}`);
        },
        [dispatch]
    );
    /**
     * Handle note click
     */
    const handleNoteClick = useCallback(
        (note) => history.push(`/directory/${notes.directory.id}/note/${note.id}`),
        [dispatch, notes?.directory?.id]
    );
    const handleSettingBtnClicked = (e, directoryId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({
            type: 'change_directory',
            directory: { directoryId }
        });
        history.push(`/directory/${directoryId}/settings`);
    };

    return (
        <>
            <ListItem
                onClick={() => handleDirectoryClick(directory.id)}
                button
                secondaryAction={
                    <KeyboardArrowRight
                        sx={{
                            transform: show ? 'rotate(90deg)' : 'rotate(0)',
                            transition: '0.3s'
                        }}
                    />
                }
                data-testid="MainMenu-directoryItem"
            >
                <ListItemText
                    primary={directory.title}
                    secondary={directory.notes
                        .map((w) => w.title)
                        .join(' - ')
                        .slice(0, 35)
                        .concat('...')}
                />
                {show && (
                    <ListItemIcon onClick={(e) => handleSettingBtnClicked(e, directory.id)}>
                        <IconButton>
                            <SettingsIcon sx={{ cursor: 'pointer' }} mr={50} />
                        </IconButton>
                    </ListItemIcon>
                )}
            </ListItem>
            <List
                sx={{
                    opacity: show ? '1' : '0',
                    height: show ? 'auto' : '0 !important',
                    padding: show ? 'auto' : '0 !important',
                    transition: show ? '0.2s opacity ease-out' : '0.1s  ease-out'
                }}
                data-testid="MainMenu-notesList"
            >
                { directory?.notes?.sort((a, b) => a.title > b.title)
                    .map((note, idx) => (
                        <ListItemButton
                            key={`MainMenu-btn-item-${note.id}`}
                            onClick={() => handleNoteClick(note)}
                        >
                            <ListItemText
                                primary={note.title}
                                secondary={note.tags?.map((t, tagsIdx) => (
                                    <Chip
                                        key={note.id + note.title.concat(t)}
                                        label={t.title}
                                        sx={{ marginRight: '0.1rem' }}
                                        size="small"
                                        component="span" // to avoid warning because secondary is wrapped in a <p>
                                        data-testid={`MainMenu-notesList-item-tag-${tagsIdx}`}
                                    />
                                ))}
                                data-testid={`MainMenu-notesList-item-${idx}`}
                            />
                        </ListItemButton>
                    ))}
                <NoteCreationMainMenuItem />
            </List>
            {show && <hr size={1} color="#e9f0f0" />}
        </>
    );
}
