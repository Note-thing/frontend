import React, {
    useContext, useEffect, useState, useMemo, useCallback
} from 'react';
import { Grid } from '@mui/material';
import TextareaMarkdown from 'textarea-markdown';
import ResizePannel from './ResizePannel';
import EditorFooter from './EditorFooter';
import EditorHeader from './EditorHeader';
import { MainContext } from '../../context/MainContext';
import { NoteContext } from '../../context/NoteContext';
import useInput from '../../hooks/useInput';
import { debounceInput } from '../../utils/utils';
import { Patch } from '../../config/config';
import '../../resource/css/editor.css';

export default function Editor() {
    const { dispatch: mainDispatch } = useContext(MainContext);
    const {
        notes: {
            note: { id, body }
        }
    } = useContext(NoteContext);
    const { bind: bindNoteBody } = useInput(body);

    const [previewWidth, setPreviewWidth] = useState(50);
    const runEditor = (area) => new TextareaMarkdown(area);

    useEffect(() => {
        if (typeof body !== 'undefined') {
            const textarea = document.querySelector('textarea#editor');
            textarea.value = body;
            runEditor(textarea);
        }
    }, [body]);

    const handlePreviewWidth = useCallback((width) => {
        setPreviewWidth(width);
    }, [setPreviewWidth]);

    const debounceBody = useCallback(debounceInput(async (value) => {
        try {
            await Patch(`/notes/${id}`, { body: value });
        } catch (err) {
            mainDispatch({
                type: 'dialog',
                dialog: { id: 'update_body_note', is_open: true }
            });
        }
    }), [id, mainDispatch, debounceInput]);

    const handleChangeBody = async (ev) => {
        bindNoteBody.onChange(ev);
        debounceBody(ev.target.value);
    };
    return useMemo(() => (
        <Grid container className="editor" data-testid="editor-component" direction="column">
            <EditorHeader
                setPreviewWidth={handlePreviewWidth}
            />
            <Grid item className="editor-content">
                <ResizePannel
                    rightWidth={previewWidth}
                    leftPannel={
                        <textarea
                            className="editor-textarea"
                            id="editor"
                            data-preview="#preview"
                            value={bindNoteBody.value}
                            onChange={handleChangeBody}
                        />
                    }
                    rightPannel={
                        <div className="preview-pannel" id="preview" />
                    }
                />
            </Grid>

            <Grid item className="editor-footer">
                <EditorFooter />
            </Grid>
        </Grid>), [previewWidth, bindNoteBody, handlePreviewWidth, handleChangeBody]);
}
