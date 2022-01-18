import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { LocalOffer } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditorTags from './EditorTags';
import EditorDialogAddTags from './EditorDialogAddTags';

/**
 * Editor Footer. Allows the user to add label to his note
 * @returns
 */
export default function EditorFooter() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Grid
            spacing={0.5}
            container
            display="flex"
            alignItems="center"
            height="100%"
            padding="0 1rem 0 1rem"
            borderTop="0.1rem solid #e9F0F0"
            className="editor-tag-footer"
        >
            <Grid item>
                <IconButton
                    data-testid="editor-footer-add-tags-btn"
                    color="primary"
                    label="Ajouter des tags"
                    onClick={handleClickOpen}
                >
                    <LocalOffer />
                </IconButton>
            </Grid>
            <EditorDialogAddTags
                open={open}
                setOpen={setOpen}
            />
            <EditorTags />
        </Grid>
    );
}
