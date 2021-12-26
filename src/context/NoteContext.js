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
