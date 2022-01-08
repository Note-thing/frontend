import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditorTags from './EditorTags';
import { Post } from '../../config/config';
import { NoteContext } from '../../context/NoteContext';

/**
 * Editor Dialog Add Tags. Show a dialog to the user to add more tags to his note
 * @returns
 */
export default function EditorDialogAddTags({
    open, setOpen
}) {
    const { notes: { note }, dispatch } = useContext(NoteContext);
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTag = (tag) => {
        if (tag !== undefined
            && tag.length > 0
            && !note.tags.map((t) => t.title).includes(tag)) {
            Post('/tags', { title: tag, note_id: note.id }).then((t) => {
                note.tags = [...note.tags, { title: t.title, id: t.id }];
                dispatch({
                    type: 'update_note',
                    note
                });
            });
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
                    <EditorTags />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Fermer</Button>
            </DialogActions>
        </Dialog>
    );
}
