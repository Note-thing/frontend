import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { LocalOffer } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Get } from '../../config/config';
import EditorTags from './EditorTags';
import EditorDialogAddTags from './EditorDialogAddTags';

/**
 * Editor Footer. Allows the user to add label to his note
 * @returns
 */
export default function EditorFooter() {
    const [tagsList, setTags] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        Get('/structure/1').then((notes) => {
            setTags(notes[0].notes[0].tags.map((tag) => ({ title: tag.title, id: tag.id })));
        });
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
                noteId={1}
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
