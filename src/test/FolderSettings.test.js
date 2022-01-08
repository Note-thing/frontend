import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render,
    screen,
    fireEvent,
    waitFor

} from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoteContext } from '../context/NoteContext';
import FolderSettingsComponent from '../layout/directory/DirectoryComponent';
import MOCK_DATA from './data';
import { MainContext } from '../context/MainContext';
import { mockStorage } from './Mock';

const notes = MOCK_DATA;
const server = setupServer();
let dispatch;
let dispatchMain;
beforeEach(() => {
    dispatch = jest.fn();
    dispatchMain = jest.fn();
});
beforeAll(() => {
    server.listen();
    dispatch = jest.fn();
    dispatchMain = jest.fn();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Object.defineProperty(window, 'options', { offset: 210 });
Object.defineProperty(window, 'localStorage', mockStorage());

// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    useParams: () => ({ directoryId: '123' }),
    useHistory: () => {}
}));

it('Folder settings - change name', async () => {
    server.use(
        rest.patch(`http://localhost:3001/api/v1/folders/${notes.directory.id}`, (req, res, ctx) => res(ctx.json({ test: '2' })))
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
                dialog: null,
                dispatch: dispatchMain
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <FolderSettingsComponent />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.change(screen.getByTestId('folder-setting-title-input').querySelector('input'), {
        target: { value: 'Nouveau nom' }
    });
    fireEvent.click(screen.getByTestId('folder-setting-name-saveBtn'));
    await waitFor(() => expect(screen.getByTestId('folder-setting-name-saveBtn')).toBeDisabled());
    await waitFor(() => expect(dispatch.mock.calls.length).toBe(1));
});

it('Folder settings - empty name', async () => {
    server.use(
        rest.patch(`http://localhost:3001/api/v1/folders/${notes.directory.id}`, (req, res, ctx) => res(ctx.json({ test: '2' })))
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
                dialog: null,
                dispatch: dispatchMain
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <FolderSettingsComponent />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.change(screen.getByTestId('folder-setting-title-input').querySelector('input'), {
        target: { value: '' }
    });
    fireEvent.click(screen.getByTestId('folder-setting-name-saveBtn'));
    await waitFor(() => expect(screen.getByText('Le nom ne peut pas être vide')).toBeInTheDocument());
});
it('Folder settings - too long name', async () => {
    server.use(
        rest.patch(`http://localhost:3001/api/v1/folders/${notes.directory.id}`, (req, res, ctx) => res(ctx.json({ test: '2' })))
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
                dialog: null,
                dispatch: dispatchMain
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <FolderSettingsComponent />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.change(screen.getByTestId('folder-setting-title-input').querySelector('input'), {
        target: { value: new Array(52).join('a') }
    });
    fireEvent.click(screen.getByTestId('folder-setting-name-saveBtn'));
    await waitFor(() => expect(
        screen.getByText('Le nom ne peut pas être plus grand que 50 caractères')
    ).toBeInTheDocument());
});

it('Folder settings - delete', async () => {
    server.use(
        rest.delete(`http://localhost:3001/api/v1/folders/${notes.directory.id}`, (req, res, ctx) => res(ctx.json({ test: '2' })))
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
                dialog: null,
                dispatch: dispatchMain
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <FolderSettingsComponent />
            </NoteContext.Provider>
        </MainContext.Provider>
    );
    fireEvent.click(screen.getByTestId('folder-setting-delete-btn'));
    expect(screen.getByTestId('folder-setting-confirmation-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('confirmation-modal-confirm-btn'));
    await waitFor(() => {
        expect(screen.getByTestId('folder-setting-delete-btn')).not.toBeDisabled();
    });
    await waitFor(() => {
        expect(dispatch.mock.calls.length).toBe(1);
    });
});
