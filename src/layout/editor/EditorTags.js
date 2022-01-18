import React, { useContext } from 'react';
import { Grid, Chip } from '@mui/material';
import { Delete } from '../../config/config';
import { NoteContext } from '../../context/NoteContext';

/**
 * Editor Tags. Show all current tags for the selected note
 * @returns
 */
export default function EditorTags() {
    const { notes: { note }, dispatch } = useContext(NoteContext);
    return (
        note.tags ? note.tags.map((tag) => (
            <Grid item key={tag.id}>
                <Chip
                    key={tag.id}
                    className="tag-chip"
                    label={tag.title}
                    data-testid={`editor-dialog-add-tags-tag-${tag.title}`}
                    color="secondary"
                    onDelete={() => {
                        note.tags = note.tags.filter((t) => t.id !== tag.id);
                        dispatch({
                            type: 'update_note',
                            note
                        });
                        Delete(`/tags/${tag.id}`);
                    }}
                />
            </Grid>
        )) : <Grid item />
    );
}
