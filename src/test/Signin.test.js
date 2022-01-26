import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MainProvider } from '../context/MainContext';
import SignIn from '../layout/login/SignIn';
import Dialog from '../layout/Dialog';

enableFetchMocks();

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

const signinRenderer = () => render(
    <MainProvider>
        <SignIn />
        <Dialog />
    </MainProvider>
);

describe('Signin Component', () => {
    it('Signin Component | Renders Properly', () => {
        const { getByTestId } = signinRenderer();
        expect(getByTestId('email-field')).toBeInTheDocument();
        expect(getByTestId('password-field')).toBeInTheDocument();
        expect(getByTestId('submit-button')).toBeInTheDocument();
    });
    it('Signin Component | Submit Empty Form', async () => {
        fetch.resetMocks();
        fetch.mockResponses(
            [
                JSON.stringify({ messages: ['invalid credentials'], code: 'invalid_credentials' }),
                { status: 403 }
            ]
        );

        const { getByText } = signinRenderer();
        const button = getByText('Se connecter');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(getByText('Login incorrecte')).toBeInTheDocument());
    });
    it('Signin Component | Submit Credentials', async () => {
        fetch.resetMocks();
        fetch.mockResponses(
            [
                JSON.stringify({
                    user: {
                        id: 1, email: 'note-thing@pm.me', created_at: '2022-01-23T12:57:26.000Z', updated_at: '2022-01-24T18:34:44.000Z', firstname: 'victor', lastname: 'hugo', email_validated: true
                    },
                    token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NDMzMTE0MzZ9.QtV93CEkJfE8ER-5Irq7pHjMkvybxGzXU2O1x9PIwB0'
                }),
                { status: 200 }
            ]
        );

        const { getByText } = signinRenderer();
        const button = getByText('Se connecter');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(getByText('Login réussi')).toBeInTheDocument());
    });
});
