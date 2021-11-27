import React, { createContext, useReducer } from 'react';

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
                note: {
                    ...state.note,
                    ...action.note
                }
            };
        default:
            return state;
    }
};

export const NoteContext = createContext();

const getURLUniqId = () => {
    const [, , directory, , note] = window.location.pathname.split('/');
    return {
        directory,
        note
    };
};

export const NoteProvider = (props) => {
    const active = getURLUniqId();
    const [notes, dispatch] = useReducer(reducer, {
        directory: { uniqid: active.directory },
        note: { uniqid: active.note },
        directories: [{
            uniqid: '619f6488babbf',
            name: 'TWEB',
            notes: [
                { uniqid: 'dfgh3245sdfg', title: 'CSS', tags: ['Web', 'design '] },
                { uniqid: 'awei546fcguuz', title: 'JS', tags: ['JS', 'prototype'] },
                { uniqid: '345jfhtzdffvret', title: 'Node', tags: ['JS', 'SSR'] }
            ]
        },
        {
            uniqid: '61ddfgg488babbf',
            name: 'PDG',
            notes: [
                { uniqid: 'dfg456fgh456', title: 'Note-thing', tags: ['Web', 'design'] },
                { uniqid: 'fghfgh345nb', title: 'Ruby on Rails', tags: ['Model', 'Controller'] },
                { uniqid: 'etz4256dsfh', title: 'CI/CD', tags: ['Jest.js', 'Unit test'] }
            ]
        },
        {
            uniqid: '4566fgg488babbf',
            name: 'AMT',
            notes: [
                { uniqid: '789dfg234dfg', title: 'Guide de survie total', tags: ['Spring'] },
                { uniqid: '456gzuwesdgf', title: 'Survire en haute mer', tags: ['Spring', 'MVC'] },
                {
                    uniqid: 'uilert3452dfg',
                    title: 'Apprendre à utiliser une boussole',
                    tags: ['Navigation']
                }
            ]
        }]
    });

    return (
        <NoteContext.Provider value={{ notes, dispatch }}>
            { props.children }
        </NoteContext.Provider>
    );
};
