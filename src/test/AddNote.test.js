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
import { CONFIG } from '../config/config';

const server = setupServer(
    rest.post(`${CONFIG.api_url}/folders`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
);

const notes = MOCK_DATA;
const noteDispatch = jest.fn();
const mainDispatch = jest.fn();

beforeEach(() => {
    document.body.innerHTML = '';
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
                dialog: null,
                dispatch: mainDispatch
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch: noteDispatch }}>
                <NoteCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Object.defineProperty(window, 'options', { offset: 210 });
Object.defineProperty(window, 'localStorage', mockStorage());
// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    useParams: () => ({ uuid: '123' }),
    useHistory: () => {}
}));

it('Note Creation - The modal show on click', async () => {
    server.use(
        rest.post(`${CONFIG.api_url}/notes`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
    );
    fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));
    expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();
});

it('Note Creation - The modal show on click and dispear on creation', async () => {
    server.use(
        rest.post(`${CONFIG.api_url}/notes`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));

    expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('note-creation-input').querySelector('input'), {
        target: { value: 'MonNouveauDossi' }
    });

    fireEvent.click(screen.getByTestId('note-creation-button'));
    await waitForElementToBeRemoved(() => screen.getByTestId('note-creation-modal'));
    expect(noteDispatch.mock.calls.length).toBe(1);
    expect(mainDispatch.mock.calls.length).toBe(1);
});

it('Note Creation - Empty name', async () => {
    fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));
    expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('note-creation-input').querySelector('input'), {
        target: { value: '' }
    });

    fireEvent.click(screen.getByTestId('note-creation-button'));
    expect(noteDispatch.mock.calls.length).toBe(0);
    expect(mainDispatch.mock.calls.length).toBe(0);
    expect(screen.getByText('Ne peut pas être vide')).toBeInTheDocument();
});
it('Note Creation - Too big name (>50chars)', async () => {
    server.use(
        rest.post(`${CONFIG.api_url}/notes`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));

    expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('note-creation-input').querySelector('input'), {
        target: { value: new Array(52).join('a') } // create a string of  51 chars
    });

    fireEvent.click(screen.getByTestId('note-creation-button'));
    expect(noteDispatch.mock.calls.length).toBe(0);
    expect(mainDispatch.mock.calls.length).toBe(0);

    expect(screen.getByText('Ne doit pas dépasser 50 caractères')).toBeInTheDocument();
});
