import React, { createContext, useReducer } from 'react';

const mainReducer = (state, action) => {
    switch (action.type) {
    case 'login':
        localStorage.setItem('User', JSON.stringify({ ...state.user, ...action.user }));
        return { ...state, user: { ...state.user, ...action.user } };
    case 'logout':
        localStorage.removeItem('User');
        return { ...state, user: { ...state.user, isAuthenticated: false } };
    default:
        return state;
    }
};

export const MainContext = createContext();

export const MainProvider = (props) => {
    const [main, dispatch] = useReducer(mainReducer, {
        user: {

        }
    });

    return (
        <MainContext.Provider value={{ main, dispatch }}>
            { props.children }
        </MainContext.Provider>
    );
};
