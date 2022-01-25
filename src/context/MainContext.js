import React, { createContext, useReducer } from 'react';

const mainReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { ...state, user: { ...state.user, ...action.user } };
        case 'logout':
            return { ...state, user: null };
        case 'dialog':
            return { ...state, dialog: { ...action.dialog } };
        default:
            return state;
    }
};

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [main, dispatch] = useReducer(mainReducer, {
        user: JSON.parse(localStorage.getItem('User')),
        dialog: null
    });

    return (
        <MainContext.Provider value={{ main, dispatch }}>
            { children}
        </MainContext.Provider>
    );
};
