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
import EditorFooter from '../layout/editor/EditorFooter';
import MOCK_DATA from './data';
import { MainContext } from '../context/MainContext';
import { mockStorage } from './Mock';

const server = setupServer(
    rest.post('http://localhost:3001/api/v1/tags', (req, res, ctx) => res(ctx.json({ test: 'test' })))
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

it('Tags Creation - The modal show on click', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/tags', (req, res, ctx) => res(ctx.json({ test: 'test' })))
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
                <EditorFooter />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('editor-footer-add-tags-btn'));

    expect(screen.getByTestId('editor-dialog-add-tags')).toBeInTheDocument();
});

it('Tags Creation - The modal show on click and we can add a tag that is displayed', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/tags', (req, res, ctx) => res(ctx.json({ title: 'MonNouveauTag', id: 88 })))
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
                <EditorFooter />
            </NoteContext.Provider>
        </MainContext.Provider>
    );

    fireEvent.click(screen.getByTestId('editor-footer-add-tags-btn'));

    expect(screen.getByTestId('editor-dialog-add-tags')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('editor-dialog-add-tags').querySelector('input'), {
        target: { value: 'MonNouveauTag{enter}' }
    });

    await setTimeout(() => {}, 2000);

    expect(screen.getByTestId('editor-dialog-add-tags-tag-MonNouveauTag')).toBeInTheDocument();

    /*fireEvent.click(screen.getByTestId('folder-creation-button'));
    await waitForElementToBeRemoved(() => screen.getByTestId('folder-creation-modal'));
    expect(dispatch.mock.calls.length).toBe(1);*/
});

/*it('Folder Creation - Empty name', async () => {
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
    expect(screen.getByText('Ne peut pas être vide')).toBeInTheDocument();
});
it('Folder Creation -  Too big name (>50chars)', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/folders', (req, res, ctx) => res(ctx.json({ test: 'test' })))
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
    expect(screen.getByText('Ne doit pas dépasser 50 caractères')).toBeInTheDocument();
});*/
