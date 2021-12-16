import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import TextareaMarkdown from 'textarea-markdown';
import EditorFooter from './EditorFooter';
import EditorHeader from './EditorHeader';
import { NoteContext } from '../../context/NoteContext';
import { useInput } from '../../hooks/useInput';

export default function EditorComponent() {
    const { notes: { note: { content } } } = useContext(NoteContext);
    const { value: noteTextArea, bind: bindNoteTextArea } = useInput(content);

    useEffect(() => {
        const textarea = document.querySelector('textarea#editor');
        textarea.value = content;
        new TextareaMarkdown(textarea);
    }, [content]);

    return (
        <Grid container direction="column" height="100%">
            <Grid item sx={{ height: '7%' }}>
                <EditorHeader />
            </Grid>
            <Grid item sx={{ p: '20px', height: '86%', overflowY: 'scroll' }}>
                <textarea
                    id="editor"
                    data-preview="#preview"
                    {...bindNoteTextArea}
                />
                <h2>Preview</h2>
                <div id="preview" />
            </Grid>
            <Grid item sx={{ height: '7%' }}>
                <EditorFooter />
            </Grid>
        </Grid>
    );
}
