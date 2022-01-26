import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
    render, fireEvent, waitFor, act
} from '@testing-library/react';
import { MainProvider } from '../context/MainContext';
import Signup from '../layout/login/Signup';
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

const signupRenderer = () => render(
    <MainProvider>
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
        <Dialog />
    </MainProvider>
);

describe('Signup Component', () => {
    it('Signup Component | Renders Properly', () => {
        const { getByTestId } = signupRenderer();
        expect(getByTestId('firstname-field')).toBeInTheDocument();
        expect(getByTestId('lastname-field')).toBeInTheDocument();
        expect(getByTestId('email-field')).toBeInTheDocument();
        expect(getByTestId('email-field')).toBeInTheDocument();
        expect(getByTestId('password-field')).toBeInTheDocument();
        expect(getByTestId('passwordRepeat-field')).toBeInTheDocument();
        expect(getByTestId('submit-button')).toBeInTheDocument();
    });
    it('Signup Component | Submit empty', async () => {
        const { getByText } = signupRenderer();
        const button = getByText('S\'inscrire');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(getByText('Le prénom est obligatoire')).toBeInTheDocument());
        await waitFor(() => expect(getByText('Le nom de famille est obligatoire')).toBeInTheDocument());
        await waitFor(() => expect(getByText('Une adresse e-mail valide doit être fournie')).toBeInTheDocument());
        await waitFor(() => expect(getByText('Le mot de passe est obligatoire')).toBeInTheDocument());
        await waitFor(() => expect(getByText('La répétition du mot de passe est obligatoire')).toBeInTheDocument());
    });
    it('Signup Component | Submit First Name Last Name', async () => {
        const { getByText, getByTestId } = signupRenderer();
        const button = getByText('S\'inscrire');
        expect(button).toBeInTheDocument();
        let firstNameField;
        let lastNameField;
        act(() => {
            firstNameField = getByTestId('firstname-field').querySelector('input');
            lastNameField = getByTestId('lastname-field').querySelector('input');
            fireEvent.change(firstNameField, { target: { value: 'Stefan' } });
            fireEvent.change(lastNameField, { target: { value: 'Teofanovic' } });
        });
        expect(firstNameField).toBeInTheDocument();
        expect(lastNameField).toBeInTheDocument();
        expect(firstNameField.value).toBe('Stefan');
        expect(lastNameField.value).toBe('Teofanovic');
        fireEvent.click(button);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(0));
        await waitFor(() => {
            try {
                getByText('Le prénom est obligatoire');
            } catch (err) {
                expect(err).toBeTruthy();
            }
        });
        await waitFor(() => {
            try {
                getByText('Le nom de famille est obligatoire');
            } catch (err) {
                expect(err).toBeTruthy();
            }
        });
        await waitFor(() => expect(getByText('Une adresse e-mail valide doit être fournie')).toBeInTheDocument());
        await waitFor(() => expect(getByText('Le mot de passe est obligatoire')).toBeInTheDocument());
        await waitFor(() => expect(getByText('La répétition du mot de passe est obligatoire')).toBeInTheDocument());
    });
    it('Signup Component | Password Missmatch', async () => {
        const { getByText, getByTestId } = signupRenderer();
        const button = getByText('S\'inscrire');
        expect(button).toBeInTheDocument();
        let firstNameField;
        let lastNameField;
        let emailField;
        let passwordField;
        let passwordRepeatField;
        act(() => {
            firstNameField = getByTestId('firstname-field').querySelector('input');
            lastNameField = getByTestId('lastname-field').querySelector('input');
            emailField = getByTestId('email-field').querySelector('input');
            passwordField = getByTestId('password-field').querySelector('input');
            passwordRepeatField = getByTestId('passwordRepeat-field').querySelector('input');
            fireEvent.change(firstNameField, { target: { value: 'Stefan' } });
            fireEvent.change(lastNameField, { target: { value: 'Teofanovic' } });
            fireEvent.change(emailField, { target: { value: 'teofanovic.stefan@heig-vd.ch' } });
            fireEvent.change(passwordField, { target: { value: 'testtest' } });
            fireEvent.change(passwordRepeatField, { target: { value: 'test' } });
        });
        expect(firstNameField).toBeInTheDocument();
        expect(lastNameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();

        expect(firstNameField.value).toBe('Stefan');
        expect(lastNameField.value).toBe('Teofanovic');
        expect(emailField.value).toBe('teofanovic.stefan@heig-vd.ch');
        expect(passwordField.value).toBe('testtest');
        expect(passwordRepeatField.value).toBe('test');
        fireEvent.click(button);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(getByText('Répétition du mot de passe erroné')).toBeInTheDocument());
    });
    it('Signup Component | Signup OK / With Existing Account', async () => {
        fetch.resetMocks();
        fetch.mockResponses(
            [
                JSON.stringify({
                    user: {
                        id: 7, email: 'testtest@test.com', created_at: '2022-01-26T21:05:17.000Z', updated_at: '2022-01-26T21:05:17.000Z', firstname: 'test', lastname: 'test', email_validated: false
                    },
                    token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE2NDMzMTc1MTl9.hrCid1mtMl8MzWTOd4-AtjzLWhFs5hdg8107cDxrC_k'
                }),
                { status: 200 }
            ], [
                JSON.stringify({ status: 422, error: 'Unprocessable Entity', exception: '#\u003cActiveRecord::RecordInvalid: Validation failed: Email has already been taken\u003e' }),
                { status: 422 }
            ]
        );
        const { getByText, getByTestId } = signupRenderer();
        const button = getByText('S\'inscrire');
        expect(button).toBeInTheDocument();
        let firstNameField;
        let lastNameField;
        let emailField;
        let passwordField;
        let passwordRepeatField;
        act(() => {
            firstNameField = getByTestId('firstname-field').querySelector('input');
            lastNameField = getByTestId('lastname-field').querySelector('input');
            emailField = getByTestId('email-field').querySelector('input');
            passwordField = getByTestId('password-field').querySelector('input');
            passwordRepeatField = getByTestId('passwordRepeat-field').querySelector('input');
            fireEvent.change(firstNameField, { target: { value: 'Stefan' } });
            fireEvent.change(lastNameField, { target: { value: 'Teofanovic' } });
            fireEvent.change(emailField, { target: { value: 'teofanovic.stefan@heig-vd.ch' } });
            fireEvent.change(passwordField, { target: { value: 'testtest' } });
            fireEvent.change(passwordRepeatField, { target: { value: 'testtest' } });
        });
        expect(firstNameField).toBeInTheDocument();
        expect(lastNameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();

        expect(firstNameField.value).toBe('Stefan');
        expect(lastNameField.value).toBe('Teofanovic');
        expect(emailField.value).toBe('teofanovic.stefan@heig-vd.ch');
        expect(passwordField.value).toBe('testtest');
        expect(passwordRepeatField.value).toBe('testtest');
        fireEvent.click(button);
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(getByText('Création du compte est réussie. Vous devez valider votre adresse e-mail.')).toBeInTheDocument());
        fireEvent.click(button);
        await waitFor(() => expect(getByText('Création du compte a échoué')).toBeInTheDocument());
    });
});
