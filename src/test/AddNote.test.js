import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render, screen, fireEvent, waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoteContext } from '../context/NoteContext';
import NoteCreationMainMenuItem from '../layout/note/NoteCreation';
import MOCK_DATA from './data';
import { MainContext } from '../context/MainContext';
import { mockStorage } from './Mock';

const server = setupServer(
    rest.post('http://localhost:3001/api/v1/folders', (req, res, ctx) => res(ctx.json({ test: 'test' })))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Object.defineProperty(window, 'options', { offset: 210 });
Object.defineProperty(window, 'localStorage', mockStorage);
// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    useParams: () => ({ uuid: '123' }),
    useHistory: () => {}
}));

const notes = MOCK_DATA;
const dispatch = jest.fn();

it('Note Creation - The modal show on click', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/notes', (req, res, ctx) => res(ctx.json({ test: 'test' })))
    );

    render(
        <MainContext.Provider
            value={{
                main: {
                    user: {
                        firstname: 'Stefan',
                        lastname: 'Teofanovic',
                        email: 'st@novic.ch',
                        isAuthenticated: true
                    }
                },
                dialog: null
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <NoteCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));

    expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();
});

it('Note Creation - The modal show on click and dispear on creation', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/notes', (req, res, ctx) => res(ctx.json({ test: 'test' })))
    );
    render(
        <MainContext.Provider
            value={{
                main: {
                    user: {
                        firstname: 'Stefan',
                        lastname: 'Teofanovic',
                        email: 'st@novic.ch',
                        isAuthenticated: true
                    }
                },
                dialog: null
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <NoteCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));

    expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('note-creation-input').querySelector('input'), {
        target: { value: 'MonNouveauDossi' }
    });

    fireEvent.click(screen.getByTestId('note-creation-button'));
    await waitForElementToBeRemoved(() => screen.getByTestId('note-creation-modal'));
    expect(dispatch.mock.calls.length).toBe(1);
});

it('Note Creation - Empty name', async () => {
    render(
        <MainContext.Provider
            value={{
                main: {
                    user: {
                        firstname: 'Stefan',
                        lastname: 'Teofanovic',
                        email: 'st@novic.ch',
                        isAuthenticated: true
                    }
                },
                dialog: null
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <NoteCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));

    expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('note-creation-input').querySelector('input'), {
        target: { value: '' }
    });

    fireEvent.click(screen.getByTestId('note-creation-button'));
    expect(dispatch.mock.calls.length).toBe(0);
    expect(screen.getByText('Ne peut pas être vide')).toBeInTheDocument();
});
it('Note Creation - Too big name (>50chars)', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/notes', (req, res, ctx) => res(ctx.json({ test: 'test' })))
    );
    render(
        <MainContext.Provider
            value={{
                main: {
                    user: {
                        firstname: 'Stefan',
                        lastname: 'Teofanovic',
                        email: 'st@novic.ch',
                        isAuthenticated: true
                    }
                },
                dialog: null
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <NoteCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));

    expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('note-creation-input').querySelector('input'), {
        target: { value: new Array(52).join('a') } // create a string of  51 chars
    });

    fireEvent.click(screen.getByTestId('note-creation-button'));
    expect(dispatch.mock.calls.length).toBe(0);
    expect(screen.getByText('Ne doit pas dépasser 50 caractères')).toBeInTheDocument();
});
