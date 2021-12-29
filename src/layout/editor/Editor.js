import React, {
    useContext, useEffect, useState, useMemo, useCallback
} from 'react';
import { Grid } from '@mui/material';
import TextareaMarkdown from 'textarea-markdown';
import ResizePannel from './ResizePannel';
import EditorFooter from './EditorFooter';
import EditorHeader from './EditorHeader';
import { NoteContext } from '../../context/NoteContext';
import useInput from '../../hooks/useInput';
import '../../resource/css/editor.css';

export default function Editor() {
    const { notes: { note: { body } } } = useContext(NoteContext);
    const { value: noteTextArea, bind: bindNoteTextArea } = useInput(body);
    const [previewWidth, setPreviewWidth] = useState(50);
    const runEditor = (area) => new TextareaMarkdown(area);
    useEffect(() => {
        if (body) {
            const textarea = document.querySelector('textarea#editor');
            textarea.value = body;
            runEditor(textarea);
        }
    }, [body]);
    const handlePreviewWidth = useCallback((width) => {
        setPreviewWidth(width);
    }, [setPreviewWidth]);

    return useMemo(() => (
        <Grid container className="editor" data-testid="editor-component" direction="column">
            <Grid item sx={{ height: '48px' }}>
                <EditorHeader setPreviewWidth={handlePreviewWidth} />
            </Grid>
            {
                body
                && <Grid item sx={{ height: 'calc(100vh - 96px)' }}>
                    <ResizePannel
                        rightWidth={previewWidth}
                        leftPannel={
                            <textarea
                                className="editor-textarea"
                                id="editor"
                                data-preview="#preview"
                                value={bindNoteTextArea.value}
                                onChange={bindNoteTextArea.onChange}
                            />
                        }
                        rightPannel={
                            <div className="preview-pannel" id="preview" />
                        }
                    />
                </Grid>
            }
            <Grid item sx={{ height: '48px' }}>
                <EditorFooter />
            </Grid>
        </Grid>), [previewWidth, handlePreviewWidth, bindNoteTextArea]);
}
