import React, { useEffect, createContext, useReducer } from 'react';

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

export const NoteContext = createContext();

const data = {
    directory: { },
    note: { },
    directories: [{
        uniqid: '619f6488babbf',
        name: 'TWEB',
        notes: [
            {
                uniqid: 'dfgh3245sdfg',
                title: 'CSS',
                tags: ['Web', 'design'],
                content: `CD  seems to work with Github Acti&#128169;!!! <br />
            Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the
            cites of the word in classical literature, discovered the
            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
            1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
            and Evil) by Cicero, written in 45 BC.
            <br />
            This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem
            ipsum dolor sit amet..", comes from a line in section 1.10.32.
            Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical Latin literature from
            45 BC, making it over 2000 years old.
            <br />
            <br />
            Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the
            cites of the word in classical literature, discovered the
            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
            1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
            and Evil) by Cicero, written in 45 BC.
            <br />
            This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem
            ipsum dolor sit amet..", comes from a line in section 1.10.32.
            Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical Latin literature from
            45 BC, making it over 2000 years old.
            <br />
            <br />
            Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the
            cites of the word in classical literature, discovered the
            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
            1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
            and Evil) by Cicero, written in 45 BC.
            <br />
            This book is a treatise on the theory of ethics, very
            popularThis book is a treatise on the theory of ethics, very
            popular during the Renaissance. The first line of Lorem Ipsum,
            "Lorem ipsum dolor sit amet..", comes from a line in section
            1.10.32. Contrary to popular belief, Lorem Ipsum is not simply
            random text. It has roots in a piece of classical Latin
            literature from 45 BC, making it over 2000 years old.
            <br />
            <br />
            Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the
            cites of the word in classical literature, discovered the
            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
            1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
            and Evil) by Cicero, written in 45 BC.
            <br />
            This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem
            ipsum dolor sit amet..", comes from a line in section 1.10.32.
            Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical Latin literature from
            45 BC, making it over 2000 years old.
            <br />
            <br />
            Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the
            cites of the word in classical literature, discovered the
            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
            1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
            and Evil) by Cicero, written in 45 BC.
            <br />
            This book is a treatise on the theory of ethics, very
            popularThis book is a treatise on the theory of ethics, very
            popular during the Renaissance. The first line of Lorem Ipsum,
            "Lorem ipsum dolor sit amet..", comes from a line in section
            1.10.32. Contrary to popular belief, Lorem Ipsum is not simply
            random text. It has roots in a piece of classical Latin
            literature from 45 BC, making it over 2000 years old.
            <br />
            <br />
            Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the
            cites of the word in classical literature, discovered the
            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
            1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
            and Evil) by Cicero, written in 45 BC.
            <br />
            This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem
            ipsum dolor sit amet..", comes from a line in section 1.10.32.
            Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical Latin literature from
            45 BC, making it over 2000 years old.
            <br />
            <br />
            Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the
            cites of the word in classical literature, discovered the
            undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
            1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
            and Evil) by Cicero, written in 45 BC.
            <br />
            This book is a treatise on the theory of ethics, very popular`
            },
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
};

const getActiveFromURL = (directories) => {
    const [, , directoryId, , noteId] = window.location.pathname.split('/');
    const directory = directories.find((d) => d.uniqid === directoryId);
    const note = directory && directory.notes.find((n) => n.uniqid === noteId);
    return {
        directory,
        note
    };
};

export const NoteProvider = ({ children }) => {
    const [notes, dispatch] = useReducer(reducer, data);

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
