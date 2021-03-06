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
import debounceInput from '../../utils/utils';
import { Patch, Get } from '../../config/config';
import '../../resource/css/editor.css';
import UnProcessableEntityError from '../../errors/UnprocessableEntityError';

export default function Editor() {
    const { dispatch: mainDispatch } = useContext(MainContext);
    const { dispatch: noteDispatch } = useContext(NoteContext);
    const {
        notes: { note }
    } = useContext(NoteContext);
    const { id, body, lock } = note;
    const { bind: bindNoteBody } = useInput(body);

    const [previewWidth, setPreviewWidth] = useState(50);
    const runEditor = (area) => new TextareaMarkdown(area);

    useEffect(() => {
        // On modifie via l'état est non la value
        //
        // textarea = body || '';
        //
        // Benedicite mihi, pater, quia peccatum...
        bindNoteBody.onChange({ target: { value: body || '' } });
        const textarea = document.querySelector('textarea#editor');
        textarea.value = body || '';
        runEditor(textarea);

        // if (note.read_only === true || lock === true) {
        //     const ev = { target: { value: body } };
        //     bindNoteBody.onChange(ev);
        // }
    }, [body]);

    const handlePreviewWidth = useCallback(
        (width) => {
            setPreviewWidth(width);
        },
        [setPreviewWidth]
    );
    const debounceBody = useCallback(
        debounceInput(async (value) => {
            try {
                const updatedNote = await Patch(`/notes/${id}`, { body: value });
                noteDispatch({ type: 'update_note', note: updatedNote });
            } catch (err) {
                if (err instanceof UnProcessableEntityError) {
                    noteDispatch({
                        type: 'update_note',
                        note: { ...note, lock: true }
                    });
                    mainDispatch({
                        type: 'dialog',
                        dialog: { id: 'locked_note', severity: 'error', is_open: true }
                    });
                    const updatedNote = await Get(`/notes/read_only/${note.id}`);
                    noteDispatch({ type: 'update_note', note: updatedNote });
                } else {
                    mainDispatch({
                        type: 'dialog',
                        dialog: { id: 'update_body_note', severity: 'error', is_open: true }
                    });
                }
            }
        }),
        [id, mainDispatch, debounceInput]
    );

    const handleChangeBody = async (ev) => {
        bindNoteBody.onChange(ev);
        debounceBody(ev.target.value);
    };
    return useMemo(
        () => (
            <Grid container className="editor" data-testid="editor-component" direction="column">
                <EditorHeader setPreviewWidth={handlePreviewWidth} />
                <Grid item className="editor-content">
                    <ResizePannel
                        rightWidth={previewWidth}
                        leftPannel={
                            <textarea
                                data-testid="editor-textarea-input"
                                className="editor-textarea"
                                id="editor"
                                disabled={(lock && note.has_mirror) || note.read_only}
                                data-preview="#preview"
                                value={bindNoteBody.value}
                                onChange={handleChangeBody}
                            />
                        }
                        rightPannel={<div className="preview-pannel" id="preview" />}
                    />
                </Grid>

                <Grid item className="editor-footer">
                    <EditorFooter />
                </Grid>
            </Grid>
        ),
        [previewWidth, bindNoteBody, handlePreviewWidth, handleChangeBody]
    );
}
