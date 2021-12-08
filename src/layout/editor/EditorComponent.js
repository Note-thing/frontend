import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import EditorFooter from './EditorFooter';
import EditorHeader from './EditorHeader';
import { NoteContext } from '../../context/NoteContext';

export default function EditorComponent() {
    const { notes: { note: { content } } } = useContext(NoteContext);
    return (
        <Grid container direction="column" height="100%">
            <Grid item sx={{ height: '7%' }}>
                <EditorHeader />
            </Grid>
            <Grid sx={{ padding: '20px', height: '86%', overflowY: 'scroll' }}>
                { content && ReactHtmlParser(content) }
            </Grid>
            <Grid item sx={{ height: '7%' }}>
                <EditorFooter />
            </Grid>
        </Grid>
    );
}
