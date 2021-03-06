import React, { useCallback, useContext, useMemo } from 'react';
import {
    Chip, List, ListItem, ListItemButton, ListItemText
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { KeyboardArrowRight } from '@mui/icons-material';
import { NoteContext } from '../../context/NoteContext';
import NoteCreation from '../note/NoteCreation';

/**
 *
 * @param {Object} props the directory object and show, a boolean whether the item is collasped
 * or note
 */
export default function MainMenuItem({ directory, show }) {
    const history = useHistory();
    const location = useLocation();
    const { notes, dispatch } = useContext(NoteContext);

    /**
     * Handle directory click.
     */
    const handleDirectoryClick = useCallback(
        (id) => {
            const destDirectory = notes.directories.find((dir) => dir.id === id);
            dispatch({
                type: 'change_directory',
                directory: { ...destDirectory }
            });
            history.push(`/directory/${id}`);
        },
        [notes, dispatch, history]
    );
    /**
     * Handle note click
     */
    const handleNoteClick = useCallback(
        (note) => {
            // prevent click in case of unchanged url
            const goTo = `/directory/${notes.directory.id}/note/${note.id}`;
            if (goTo === location.pathname) {
                return;
            }
            /*
                clear the currently displayed note,
                URL change will trigger note context api call to get latest note data
                */
            dispatch({
                type: 'change_note',
                note: {}
            });
            history.push(`/directory/${notes.directory.id}/note/${note.id}`);
        },
        [dispatch, notes?.directory?.id, location.pathname]
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

    return useMemo(
        () => (
            <>
                <ListItem
                    onClick={() => handleDirectoryClick(directory.id)}
                    button
                    sx={{ backgroundColor: show && '#b8c1c1' }}
                    secondaryAction={
                        <KeyboardArrowRight
                            sx={{
                                transform: show ? 'rotate(90deg)' : 'rotate(0)',
                                transition: '0.3s'
                            }}
                        />
                    }
                    data-testid={'MainMenu-directoryItem'.concat(directory.id)}
                >
                    <ListItemText
                        primary={directory.title}
                        secondary={directory.notes
                            .map((w) => w.title)
                            .join(' - ')
                            .slice(0, 35)
                            .concat('...')}
                    />
                </ListItem>
                <List
                    sx={{
                        opacity: show ? '1' : '0',
                        height: show ? 'auto' : '0 !important',
                        padding: '0',
                        transition: show ? '0.2s opacity ease-out' : '0.1s  ease-out'
                    }}
                    data-testid={'MainMenu-notesList'.concat(directory.id)}
                >
                    {directory?.notes
                        ?.sort((a, b) => a.title > b.title)
                        .map(
                            (note, idx) => note && (
                                <ListItemButton
                                    key={'MainMenu-btn-item-'.concat(note.id)}
                                    onClick={() => handleNoteClick(note)}
                                    sx={{ backgroundColor: notes.note.id === note.id && '#e9f0f0', minHeight: '4rem' }}
                                >
                                    <ListItemText
                                        primary={note.title}
                                        secondary={note.tags?.map((t, tagsIdx) => (
                                            <Chip
                                                key={note.id + note.title.concat(t.title)}
                                                label={t.title}
                                                sx={{ marginRight: '0.1rem' }}
                                                size="small"
                                                component="span" // to avoid warning because secondary is wrapped in a <p>
                                                data-testid={'MainMenu-notesList-item-tag-'.concat(
                                                    tagsIdx
                                                )}
                                            />
                                        ))}
                                        data-testid={'MainMenu-notesList-item-'.concat(idx)}
                                    />
                                </ListItemButton>
                            )
                        )}
                    <NoteCreation />
                </List>
                {show && <hr size={1} color="#e9f0f0" />}
            </>
        ),
        [directory, show, handleNoteClick, handleDirectoryClick, handleSettingBtnClicked]
    );
}
