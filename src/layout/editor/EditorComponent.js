import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import TextareaMarkdown from 'textarea-markdown';
import ResizePannel from './ResizePannel';
import EditorFooter from './EditorFooter';
import EditorHeader from './EditorHeader';
import { NoteContext } from '../../context/NoteContext';
import { useInput } from '../../hooks/useInput';
import '../../resource/css/editor.css';

export default function EditorComponent() {
    const { notes: { note: { content } } } = useContext(NoteContext);
    const { value: noteTextArea, bind: bindNoteTextArea } = useInput(content);
    const runEditor = (area) => new TextareaMarkdown(area);
    useEffect(() => {
        const textarea = document.querySelector('textarea#editor');
        textarea.value = content;
        runEditor(textarea);
    }, [content]);

    return (
        <Grid className="editor" direction="column">
            <Grid item sx={{ height: '7%' }}>
                <EditorHeader />
            </Grid>
            <Grid item sx={{ height: '86%' }}>
                <ResizePannel
                    leftPannel={
                        <textarea
                            className="editor-textarea"
                            id="editor"
                            data-preview="#preview"
                            {...bindNoteTextArea}
                        />
                    }
                    rightPannel={
                        <div className="preview-pannel" id="preview" />
                    }
                />
            </Grid>
            <Grid item sx={{ height: '7%' }}>
                <EditorFooter />
            </Grid>
        </Grid>
    );
}
