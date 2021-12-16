import React from 'react';
import { Grid, Chip } from '@mui/material';

/**
 * Editor Tags. Show all current tags for the selected note
 * @returns
 */
export default function EditorTags({ tagsList, setTags }) {
    return (
        tagsList.map((tag, idx) => (
            <Grid item>
                <Chip
                    key={idx}
                    className="tag-chip"
                    label={tag}
                    color="secondary"
                    onDelete={() => {
                        setTags(tagsList.filter((_, i) => i !== idx));
                        // Delete('/tags', idx);
                    }}
                />
            </Grid>
        ))
    );
}
