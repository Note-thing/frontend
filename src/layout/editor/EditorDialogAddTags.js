import React from 'react';
import { Grid, PropTypes } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditorTags from './EditorTags';

/**
 * Editor Dialog Add Tags. Show a dialog to the user to add more tags to his note
 * @returns
 */
export default function EditorDialogAddTags({ tagsList, setTags, open, setOpen }) {
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

    return (
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
                    <EditorTags
                        tagsList={tagsList}
                        setTags={setTags}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Fermer</Button>
            </DialogActions>
        </Dialog>
    );
}
