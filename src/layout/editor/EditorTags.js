import React from 'react';
import { Grid, Chip } from '@mui/material';
import { Get, Delete } from '../../config/config';

/**
 * Editor Tags. Show all current tags for the selected note
 * @returns
 */
export default function EditorTags({ tagsList, setTags }) {
    return (
        tagsList.map((tag) => (
            <Grid item>
                <Chip
                    key={tag.id}
                    className="tag-chip"
                    label={tag.title}
                    color="secondary"
                    onDelete={() => {
                        setTags(tagsList.filter((t) => t.id !== tag.id));
                        Delete(`/tags/${tag.id}`);
                    }}
                />
            </Grid>
        ))
    );
}
