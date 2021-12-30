import React, {
    useContext, useEffect, useState, useMemo, useCallback
} from 'react';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router';
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

// Has to be ouside. Otherwise it will be erased next render
let debounceTitle;

export default function Editor() {
    const location = useLocation();
    const { dispatch: mainDispatch } = useContext(MainContext);
    const {
        notes: {
            note: { id, body, title }
        },
        dispatch: noteDispatch
    } = useContext(NoteContext);
    const { value: noteBody, bind: bindNoteBody } = useInput(body);
    const { value: noteTitle, bind: bindNoteTitle } = useInput(title);
    const [previewWidth, setPreviewWidth] = useState(50);
    const runEditor = (area) => new TextareaMarkdown(area);
   
    /*
    useEffect(() => {
        debounceTitle = debounceInput(async () => {
            try {
                // const note = await Patch(`/notes/${id}`, { title: noteTitle });
                noteDispatch({
                    type: 'change_note',
                    note: {
                        title: noteTitle
                    }
                });
            } catch (err) {
                mainDispatch({
                    type: 'dialog',
                    dialog: { id: 'update_name_note', is_open: true }
                });
            }
        });
    }, []);
    */

    useEffect(() => {
        if (body) {
            const textarea = document.querySelector('textarea#editor');
            textarea.value = body;
            runEditor(textarea);
        }
    }, [body]);

    useEffect(() => {
        if (noteTitle !== title) {
            debounceTitle(noteTitle);
        }
    }, [noteTitle]);

    const handlePreviewWidth = useCallback((width) => {
        setPreviewWidth(width);
    }, [setPreviewWidth]);

    return useMemo(() => (
        <Grid container className="editor" data-testid="editor-component" direction="column">
            <EditorHeader
                setPreviewWidth={handlePreviewWidth}
                bindNoteTitle={bindNoteTitle}
            />
            {
                body
                && <Grid item className="editor-content">
                    <ResizePannel
                        rightWidth={previewWidth}
                        leftPannel={
                            <textarea
                                className="editor-textarea"
                                id="editor"
                                data-preview="#preview"
                                value={bindNoteBody.value}
                                onChange={bindNoteBody.onChange}
                            />
                        }
                        rightPannel={
                            <div className="preview-pannel" id="preview" />
                        }
                    />
                   </Grid>
            }
            <Grid item className="editor-footer">
                <EditorFooter />
            </Grid>
        </Grid>), [previewWidth, handlePreviewWidth, title, bindNoteTitle, bindNoteBody]);
}
