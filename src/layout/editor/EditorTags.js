import React, { useContext } from 'react';
import { Grid, Chip } from '@mui/material';
import { Delete } from '../../config/config';
import { NoteContext } from '../../context/NoteContext';
import { MainContext } from '../../context/MainContext';

/**
 * Editor Tags. Show all current tags for the selected note
 * @returns
 */
export default function EditorTags() {
    const { notes: { note }, dispatch } = useContext(NoteContext);
    const { dispatch: mainDispatch } = useContext(MainContext);
    return (
        note.tags ? note.tags.map((tag) => (
            <Grid item key={tag.id}>
                <Chip
                    key={tag.id}
                    className="tag-chip"
                    label={tag.title}
                    color="secondary"
                    onDelete={async () => {
                        note.tags = note.tags.filter((t) => t.id !== tag.id);
                        dispatch({
                            type: 'update_note',
                            note
                        });
                        try {
                            await Delete(`/tags/${tag.id}`);
                        } catch (error) {
                            mainDispatch({
                                type: 'dialog',
                                dialog: {
                                    id: 'tag_delete_failed',
                                    severity: 'error',
                                    is_open: true,
                                    info: error.getMessage()
                                }
                            });
                        }
                    }}
                />
            </Grid>
        )) : <Grid item />
    );
}
