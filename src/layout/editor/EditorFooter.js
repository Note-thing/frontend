import React, { useContext } from 'react';
import { Grid, Chip, TextField, Button } from '@mui/material';
import { NoteContext } from '../../context/NoteContext';

/**
 * Editor Footer. Allows the user to add label to his note
 * @returns
 */
export default function EditorFooter() {
    const { notes: { note: { tags } } } = useContext(NoteContext);
    return (
        <Grid
            display="flex"
            alignItems="center"
            height="100%"
            padding="0 1rem 0 1rem"
            borderTop="0.1rem solid #e9F0F0"
            className="editor-tag-footer"
        >
            {tags && tags.map((tag, idx) => (
                <Chip
                    key={idx}
                    className="tag-chip"
                    label={tag}
                    onDelete={() => console.log(`delete${{ tag }}`)}
                />
            ))}
            <TextField
                sx={{ mb: '20px', ml: '24px' }}
                label="New tag"
                variant="standard"
                size="small"
            />
            <Button variant="text" size="small">Add</Button>
        </Grid>
    );
}
