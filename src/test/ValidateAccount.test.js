import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
    render, waitFor
} from '@testing-library/react';
import { MainProvider } from '../context/MainContext';
import ValidateAccount from '../layout/login/ValidateAccount';
import Dialog from '../layout/Dialog';

enableFetchMocks();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        pathname: 'localhost:3000/validate_account'
    })
}));

Object.defineProperty(window, 'location', {
    value: {
        pathname: 'localhost:3000/validate_account'
    }
});

Object.defineProperty(window, 'localStorage', {
    value: (function () {
        let store = {
            User: '{"email":"note-thing@pm.me","isAuthenticated":false}',
            Token: ''
        };
        return {
            getItem(key) {
                return store[key];
            },
            setItem(key, value) {
                store[key] = value.toString();
            },
            clear() {
                store = {};
            }
        };
    }())
});

const validateAccountRenderer = () => render(
    <MainProvider>
        <BrowserRouter>
            <ValidateAccount />
        </BrowserRouter>
        <Dialog />
    </MainProvider>
);

describe('Validate Account Component', () => {
    it('Validate Account Component | Loader', () => {
        const { getByTestId } = validateAccountRenderer();
        expect(getByTestId('loader')).toBeInTheDocument();
    });
    it('Validate Account Component | Missing Token', async () => {
        const { getByText } = validateAccountRenderer();
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(getByText('Token de validation invalide')).toBeInTheDocument());
    });
    it('Validate Account Component | Invalid Token', async () => {
        Object.defineProperty(window.location, 'search', {
            value: {
                token: '8d0fa04e9e7bac0a3078'
            }
        });
        const { getByText } = validateAccountRenderer();
        await waitFor(() => expect(getByText('Erreur pendant la validation du compte')).toBeInTheDocument());
    });
});
