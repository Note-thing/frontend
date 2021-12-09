import React from 'react';
import { Grid, Chip } from '@mui/material';
import { Delete, LocalOffer } from '@mui/icons-material';
import { Get, Delete as Del } from '../../config/config';
/**
 * Editor Footer. Allows the user to add label to his note
 * @returns
 */
export default function EditorFooter() {
    let tags = ['Compound litteral', 'RHH', 'Blanc'];
    // tags = await Get('/tags');
    return (
        <Grid
            display="flex"
            alignItems="center"
            height="100%"
            padding="0 1rem 0 1rem"
            borderTop="0.1rem solid #e9F0F0"
            className="editor-tag-footer"
        >
            <LocalOffer />
            {tags.map((tag, idx) => (
                <Chip
                    key={idx}
                    className="tag-chip"
                    label={tag}
                    onDelete={() => {
                        tags = tags.filter((_, i) => i !== idx);
                        Del('/tags', idx);
                    }}
                />
            ))}
        </Grid>
    );
}
