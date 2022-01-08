import React, { useContext, useMemo } from 'react';
import {
    Grid, Chip, TextField, Button
} from '@mui/material';
import { NoteContext } from '../../context/NoteContext';

/**
 * Editor Footer. Allows the user to add label to his note
 * @returns
 */
export default function EditorFooter() {
    const { notes: { note: { tags } } } = useContext(NoteContext);
    return useMemo(() => (
        <Grid className="editor-footer">
            {tags && tags.map((tag) => (
                <Chip
                    key={tag.id}
                    className="tag-chip"
                    label={tag.title}
                    onDelete={() => true /** TODO implémenter logique */}
                />
            ))}
            <TextField
                sx={{ mb: '20px', ml: '24px' }}
                label="New tag"
                variant="standard"
                size="small"
            />
            <Button variant="text" size="small">Add</Button>
        </Grid>),
    [tags]);
}
