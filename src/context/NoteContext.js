import React, { createContext, useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'change_directory':
            return {
                ...state,
                activeDirectory: {
                    ...state.activeDirectory,
                    ...action.activeDirectory
                }
            };
        default:
            return state;
    }
};

export const NoteContext = createContext();

const getDirectoryURLUniqId = () => {
    const tokens = window.location.pathname.split('/');
    if (tokens[1] === 'directory') {
        return {
            uniqid: tokens[2]
        };
    }
    return null;
};

export const NoteProvider = (props) => {
    const [note, dispatch] = useReducer(reducer, {
        activeDirectory: getDirectoryURLUniqId(),
        directories: [{
            uniqid: '619f6488babbf',
            name: 'TWEB',
            notes: [
                { title: 'CSS', tags: ['Web', 'design '] },
                { title: 'JS', tags: ['JS', 'prototype'] },
                { title: 'Node', tags: ['JS', 'SSR'] }
            ]
        },
        {
            uniqid: '61ddfgg488babbf',
            name: 'PDG',
            notes: [
                { title: 'Note-thing', tags: ['Web', 'design'] },
                { title: 'Ruby on Rails', tags: ['Model', 'Controller'] },
                { title: 'CI/CD', tags: ['Jest.js', 'Unit test'] }
            ]
        },
        {
            uniqid: '4566fgg488babbf',
            name: 'AMT',
            notes: [
                { title: 'Guide de survie total', tags: ['Spring'] },
                { title: 'Survire en haute mer', tags: ['Spring', 'MVC'] },
                {
                    title: 'Apprendre à utiliser une boussole',
                    tags: ['Navigation']
                }
            ]
        }]
    });

    return (
        <NoteContext.Provider value={{ note, dispatch }}>
            { props.children }
        </NoteContext.Provider>
    );
};
