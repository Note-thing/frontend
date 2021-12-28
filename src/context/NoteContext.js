import React, { useEffect, createContext, useReducer} from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Get } from '../config/config';

export const NoteContext = createContext();

const getActiveFromURL = (directories) => {
    const [, , directoryId, , noteId] = window.location.pathname.split('/');
    const directory = directories.find((d) => d.id === directoryId);
    return {
        directory,
        noteId
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'reset':
            return {
                ...state,
                directories: action.directories
            };
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
                    ...state.directories.filter((d) => d.id !== action.directory.id),
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
                directory: dir.id === state.directory.id ? {} : state.directory,
                directories: [
                    ...state.directories.filter((d) => d.id !== dir.id)
                ]
            };
        }
        case 'update_note': {
            const dir = state.directories.find((d) => d.id !== action.note.folder_id);
            dir.notes.push(action.note);
            return {
                ...state,
                // Update the open note.
                note: (action.note.id === state.note.id ? action.note : state.note),
                directories: [
                    ...state.directories.filter((d) => d.id !== dir.id),
                    dir
                ]
            };
        }
        case 'delete_note': {
            const dir = state.directories.find((d) => d.id !== action.note.folder_id);
            dir.notes = dir.notes.filter((n) => n.id !== action.note.id);
            // Update the directory and the directories (list): we delete the note in the
            // containing directory
            return {
                ...state,
                note: action.note.id === state.note.id ? {} : state.note,
                directory: (dir.id === state.directory.id ? dir : state.directory),
                directories: [
                    ...state.directories.filter((d) => d.id !== dir.id),
                    dir
                ]
            };
        }
        default:
            return state;
    }
};

export const NoteProvider = ({
    user, children, mainDispatch
}) => {
    const location = useLocation();
    const [notes, dispatch] = useReducer(reducer, {
        note: {
            content: null
        },
        directory: {
            id: null
        },
        directories: []
    });
    useEffect(() => {
        console.log('structure');
        const getFolder = async () => {
            try {
                const folders = await Get('/structure');
                dispatch({ type: 'reset', directories: folders });
            } catch (err) {
                mainDispatch({ type: 'dialog', dialog: { id: 'cannotLoadStructure', is_open: true } });
            }
        };
        getFolder();
    }, []);

    useEffect(() => {
        console.log('active', location);
        if (notes.directories) {
            const active = getActiveFromURL(notes.directories);
            if (active.directory) {
                dispatch({
                    type: 'change_directory',
                    directory: active.directory
                });
            }
            if (active.noteId) {
                (async () => {
                    try {
                        const data = await Get(`/notes/${active.noteId}`);
                        dispatch({
                            type: 'change_note',
                            note: data
                        });
                    } catch (err) {
                        mainDispatch({ type: 'dialog', dialog: { id: 'cannotLoadStructure', is_open: true } });
                    }
                })();
            }
        }
    }, [location?.pathname]);

    return (
        <NoteContext.Provider value={{ notes, dispatch }}>
            { children }
        </NoteContext.Provider>
    );
};

NoteProvider.propTypes = {
    children: PropTypes.element.isRequired
};
