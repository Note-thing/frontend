import React, { useEffect, createContext, useReducer, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { MainContext } from './MainContext';
import { CONFIG, Get } from '../config/config';

export const NoteContext = createContext();

const getActiveFromURL = (directories) => {
    const [, page, directoryId, , noteId] = window.location.pathname.split('/');
    let directory;
    let note;
    if (directoryId) {
        directory = directories.find((d) => d.id === parseInt(directoryId, 10));
    }
    if (directory && noteId) {
        note = directory.notes.find((d) => d.id === parseInt(noteId, 10));
    }

    const anyMissing = page === 'directory' && ((directoryId && !directory) || (noteId && !note));
    return {
        directory,
        note,
        anyMissing
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'reset':
            return {
                directory: {},
                note: {},
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
                directories: [...state.directories.filter((d) => d.id !== action.directory.id), dir]
            };
        }
        case 'delete_directory': {
            const dir = action.directory;
            return {
                ...state,
                // If the opened directory is the deleted one, unset directory key
                // and remove it from the directories key list.
                directory: dir.id === state.directory.id ? {} : state.directory,
                directories: [...state.directories.filter((d) => d.id !== dir.id)]
            };
        }
        case 'update_note': {
            const dir = state.directories.find((d) => d.id === action.note.folder_id);
            dir.notes = dir.notes.filter((n) => n.id !== action.note.id);
            dir.notes.push(action.note);
            return {
                ...state,
                // Update the open note.
                note: action.note.id === state.note.id ? action.note : state.note,
                directories: [dir, ...state.directories.filter((d) => d.id !== dir.id)]
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
                directory: dir.id === state.directory.id ? dir : state.directory,
                directories: [...state.directories.filter((d) => d.id !== dir.id), dir]
            };
        }
        default:
            return state;
    }
};

export const NoteProvider = ({ children }) => {
    const location = useLocation();
    const { dispatch: mainDispatch } = useContext(MainContext);
    const [notes, dispatch] = useReducer(reducer, {
        directories: [],
        directory: {},
        note: {}
    });
    /**
     * Get folders / notes to display in the main menu
     */
    useEffect(() => {
        // initial run -> api call to get folder structure
        (async () => {
            try {
                const folders = await Get('/structure');
                dispatch({ type: 'reset', directories: folders });
            } catch (err) {
                window.location.replace(CONFIG.frontend_url + CONFIG.signin_url);
            }
            return undefined;
        })();
    }, []);

    /**
     * Update the state (current opened folder and/or  current opened note) when the location change
     */
    useEffect(() => {
        /*
            url change, page refresh or directories loaded ->
            restore context state based on current url
        */
        if (notes.directories && notes.directories.length > 0) {
            const { directory, note, anyMissing } = getActiveFromURL(notes.directories);
            if (anyMissing) {
                mainDispatch({
                    type: 'dialog',
                    dialog: { id: 'missing_ressource', severity: 'error', is_open: true }
                });
                setTimeout(() => window.location.replace(CONFIG.frontend_url), 2000);
                return;
            }
            if (directory) {
                dispatch({
                    type: 'change_directory',
                    directory
                });
            }
            if (note && notes.note.id !== note.id) {
                (async () => {
                    try {
                        const data = await Get(`/notes/${note.id}`);
                        /*
                            Reuse unchangable note data already exsiting in the note context
                            Refresh with changeable data from api response
                        */
                        dispatch({
                            type: 'change_note',
                            note: {
                                ...note,
                                body: data.body,
                                title: data.title,
                                updated_at: data.updated_at,
                                folder_id: data.folder_id
                            }
                        });
                    } catch (err) {
                        mainDispatch({
                            type: 'dialog',
                            dialog: { id: 'cannotLoadStructure', severity: 'error', is_open: true }
                        });
                    }
                })();
            }
        }
    }, [location?.pathname, notes.directories]);

    return useMemo(
        () =>
            notes &&
            notes.directories && (
                <NoteContext.Provider value={{ notes, dispatch }}>{children}</NoteContext.Provider>
            ),
        [notes, dispatch]
    );
};
