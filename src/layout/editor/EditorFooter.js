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

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTag = (tag) => {
        if (tag !== undefined && tag.length > 0 && !tagsList.includes(tag)) {
            setTags([...tagsList, tag]);
            // Post('tag', tag);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTag(e.target.value);
            e.target.value = '';
        }
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nouveaux tags</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ajouter de nouveaux tags ci-dessous en rentrant le nom puis en
                        appuyant sur entrée.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tag"
                        label="Tag"
                        type="text"
                        fullWidth
                        variant="standard"
                        onKeyPress={handleKeyPress}
                    />
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
                        <DialogContentText>
                            Tags actuelles:
                        </DialogContentText>
                        {tagsList.map((tag, idx) => (
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
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </Dialog>
            {tagsList.map((tag, idx) => (
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
            ))}
        </Grid>
    );
}
