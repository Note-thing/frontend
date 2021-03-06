import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render,
    screen,
    fireEvent,
    waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoteContext } from '../context/NoteContext';
import FolderCreationMainMenuItem from '../layout/directory/FolderCreation/FolderCreation';
import MOCK_DATA from './data';
import { MainContext } from '../context/MainContext';
import { mockStorage } from './Mock';
import { CONFIG } from '../config/config';

const server = setupServer(
    rest.post(`${CONFIG.api_url}/folders`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
);

Object.defineProperty(window, 'localStorage', mockStorage());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    useParams: () => ({ uuid: '123' }),
    useHistory: () => {}
}));

const notes = MOCK_DATA;
const dispatch = jest.fn();

it('Folder Creation - The modal show on click', async () => {
    server.use(
        rest.post(`${CONFIG.api_url}/folders`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
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
                <FolderCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-folder-btn'));

    expect(screen.getByTestId('folder-creation-modal')).toBeInTheDocument();
});

it('Folder Creation - The modal show on click and dispear on creation', async () => {
    server.use(
        rest.post(`${CONFIG.api_url}/folders`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
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
                <FolderCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-folder-btn'));

    expect(screen.getByTestId('folder-creation-modal')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('folder-creation-input').querySelector('input'), {
        target: { value: 'MonNouveauDossi' }
    });

    fireEvent.click(screen.getByTestId('folder-creation-button'));
    await waitForElementToBeRemoved(() => screen.getByTestId('folder-creation-modal'));
    expect(dispatch.mock.calls.length).toBe(1);
});

it('Folder Creation - Empty name', async () => {
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
                <FolderCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-folder-btn'));

    expect(screen.getByTestId('folder-creation-modal')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('folder-creation-input').querySelector('input'), {
        target: { value: '' }
    });

    fireEvent.click(screen.getByTestId('folder-creation-button'));
    expect(dispatch.mock.calls.length).toBe(0);
    expect(screen.getByText('Ne peut pas ??tre vide')).toBeInTheDocument();
});
it('Folder Creation -  Too big name (>50chars)', async () => {
    server.use(
        rest.post(`${CONFIG.api_url}/folders`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
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
                <FolderCreationMainMenuItem />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('MainMenu-add-folder-btn'));

    expect(screen.getByTestId('folder-creation-modal')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('folder-creation-input').querySelector('input'), {
        target: { value: new Array(52).join('a') } // create a string of  51 chars
    });

    fireEvent.click(screen.getByTestId('folder-creation-button'));
    expect(dispatch.mock.calls.length).toBe(0);
    expect(screen.getByText('Ne doit pas d??passer 50 caract??res')).toBeInTheDocument();
});
