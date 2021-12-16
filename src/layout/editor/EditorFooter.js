import React, { useEffect, useState } from 'react';
import { Grid, Chip } from '@mui/material';
import { LocalOffer } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Get, Delete, Post } from '../../config/config';
import EditorTags from './EditorTags';
import EditorDialogAddTags from './EditorDialogAddTags';

/**
 * Editor Footer. Allows the user to add label to his note
 * @returns
 */
export default function EditorFooter() {
    const [tagsList, setTags] = useState(['CD', 'Git', 'JS']);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        // setTags(Get('/tags'));
    }, []);

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
                    color="primary"
                    label="Ajouter des tags"
                    onClick={handleClickOpen}
                >
                    <LocalOffer />
                </IconButton>
            </Grid>
            <EditorDialogAddTags
                tagsList={tagsList}
                setTags={setTags}
                open={open}
                setOpen={setOpen}
            />
            <EditorTags
                tagsList={tagsList}
                setTags={setTags}
            />
        </Grid>
    );
}
