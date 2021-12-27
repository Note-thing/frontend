import React, { useEffect, createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const NoteContext = createContext();

const getActiveFromURL = (directories) => {
    const [, , directoryId, , noteId] = window.location.pathname.split('/');
    const directory = directories.find((d) => d.uniqid === directoryId);
    const note = directory && directory.notes.find((n) => n.uniqid === noteId);
    return {
        directory,
        note
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'change_directory':
            return {
                ...state,
                directory: {
                    ...state.directory,
                    ...action.directory
                }
            };
        case 'change_note':
            return {
                ...state,
                note: { ...action.note }
            };
        case 'update_directory': {
            const dir = action.directory;
            return {
                ...state,
                directories: [
                    ...state.directories.filter((d) => d.uniqid !== action.directory.uniqid),
                    dir
                ]
            };
        }
        case 'delete_directory': {
            const dir = action.directory;
            return {
                ...state,
                // If the opened directory is the deleted one, unset directory key 
                // and remove it from the directories key list. 
                directory: dir.uniqid === state.directory.uniqid ? {} : state.directory, 
                directories: [
                    ...state.directories.filter((d) => d.uniqid !== dir.uniqid)
                ]
            };
        }
        case 'update_note': {
            const dir = state.directories.find((d) => d.uniqid !== action.note.folder_id);
            dir.notes.push(action.note);
            return {
                ...state,
                // Update the open note.
                note: (action.note.uniqid === state.note.uniqid ? action.note : state.note),
                directories: [
                    ...state.directories.filter((d) => d.uniqid !== dir.uniqid),
                    dir
                ]
            };
        }
        case 'delete_note': {
            const dir = state.directories.find((d) => d.uniqid !== action.note.folder_id);
            dir.notes = dir.notes.filter((n) => n.uniqid !== action.note.id);
            // Update the directory and the directories (list): we delete the note in the
            // containing directory
            return {
                ...state,
                note: action.note.uniqid === state.note.uniqid ? {} : state.note,
                directory: (dir.uniqid === state.directory.uniqid ? dir : state.directory),
                directories: [
                    ...state.directories.filter((d) => d.uniqid !== dir.uniqid),
                    dir
                ]
            };
        }
        default:
            return state;
    }
};

export const NoteProvider = (props) => {
    const { initialState, children } = props;
    const [notes, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const active = getActiveFromURL(notes.directories);
        if (active.directory) {
            dispatch({
                type: 'change_directory',
                directory: active.directory
            });
        }
        if (active.note) {
            dispatch({
                type: 'change_note',
                note: active.note
            });
        }
    }, [dispatch]);

    return (
        <NoteContext.Provider value={{ notes, dispatch }}>
            { children }
        </NoteContext.Provider>
    );
};

NoteProvider.propTypes = {
    children: PropTypes.element.isRequired,
    initialState: PropTypes.shape.isRequired
};
