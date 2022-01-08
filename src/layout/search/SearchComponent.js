import React, { useState, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Input, List, Box, ListItemButton, ListItemText, Chip
} from '@mui/material';
import { NoteContext } from '../../context/NoteContext';
import { search } from '../../utils/search';

/**
 * Display a search input and the result
 */
export default function SearchComponent() {
    const history = useHistory();
    const [searchMade, setSearchMade] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const { notes } = useContext(NoteContext);

    /**
     * Handle the search input change
     * @param {Event} ev the HTML event
     */
    const handleSearchInputChange = (ev) => {
        setSearchMade(true);
        setSearchInputValue(ev.target.value);
        if (ev.target.value !== '') {
            setSearchResult(
                [...search(notes, ev.target.value).values()]
                    .sort((a, b) => a.score < b.score)
                    .map((a) => a.note)
            );
        } else {
            setSearchResult([]);
        }
    };

    /**
     * Clear the search
     */
    const clearSearch = () => {
        setSearchMade(false);
        setSearchInputValue('');
        setSearchResult([]);
    };

    /**
     * Handle click on a search result note. It redirects the user to the note
     */
    const handleNoteClick = useCallback((note) => {
        clearSearch();
        history.push(`/directory/${note.folder_id}/note/${note.id}`);
    }, []);

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Input
                sx={{ width: '100%', marginBottom: '1rem' }}
                placeholder="Rechercher dans les notes"
                value={searchInputValue}
                onChange={handleSearchInputChange}
            />
            {searchMade && (
                <List
                    sx={{
                        position: 'absolute',
                        left: '367px',
                        bottom: -17,
                        width: '383px',
                        maxHeight: '800px',
                        minHeight: '100px',
                        overflowY: 'scroll',
                        border: '1px solid #e9f0f0'
                    }}
                >
                    {searchResult.length === 0 && (
                        <Box sx={{ textAlign: 'center', height: '100%', width: '100%' }}>
                            Aucun résultat
                        </Box>
                    )}
                    {searchResult.map((note, idx) => (
                        <ListItemButton
                            sx={{ height: '80px' }}
                            key={'MainMenu-btn-item-'.concat(note.id)}
                            onClick={() => handleNoteClick(note)}
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
                                        data-testid={'MainMenu-notesList-item-tag-'.concat(tagsIdx)}
                                    />
                                ))}
                                data-testid={'MainMenu-notesList-item-'.concat(idx)}
                            />
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    );
}
