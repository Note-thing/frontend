import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render, screen, fireEvent, waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoteContext } from '../context/NoteContext';
import EditorHeader from '../layout/editor/EditorHeader';
import MOCK_DATA from './data';
import { MainContext } from '../context/MainContext';
import { mockStorage } from './Mock';
import { CONFIG } from '../config/config';

Object.defineProperty(window, 'options', { offset: 210 });
Object.defineProperty(window, 'localStorage', mockStorage());
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'localhost:3000/directory/1'
    }),
    useHistory: () => ({
        push: (where) => `localhost:3000${where}`
    })
}));
const dispatch = jest.fn();
const dispatchMain = jest.fn();
const notes = MOCK_DATA;

const server = setupServer();

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const sharedNote = [
    {
        id: 5,
        title: 'Nouvelle note',
        body: 'Je suis une nouvelle note',
        created_at: '2022-01-07T14:48:01.000Z',
        updated_at: '2022-01-07T14:48:01.000Z',
        note_id: notes.note.id,
        uuid: 'ff1efcf3-12a6-4c9b-9ce4-c6b1ccd2bd91'
    },
    {
        id: 6,
        title: 'Nouvelle note',
        body: 'Je suis une nouvelle note',
        created_at: '2022-01-07T14:48:36.000Z',
        updated_at: '2022-01-07T14:48:36.000Z',
        note_id: notes.note.id,
        uuid: 'b4279dda-8352-4d4c-bd68-0b89e7644893'
    }
];

describe('Editor Header - base', () => {
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
                    dispatch: dispatchMain
                }}
            >
                <NoteContext.Provider value={{ notes, dispatch }}>
                    <EditorHeader />
                </NoteContext.Provider>
            </MainContext.Provider>
        );
    });
    it('Editor header - delete note', async () => {
        server.use(
            rest.delete(`http://localhost:3001/api/v1/notes/${notes.note.id}`, (req, res, ctx) => res(ctx.json({ test: '2' })))
        );
        server.use(
            rest.get(
                `http://localhost:3001/api/v1/notes/${notes.note.id}/shared_notes`,
                (req, res, ctx) => res(ctx.json(sharedNote))
            )
        );
        fireEvent.click(screen.getByTestId('editor-header-delete-btn'));
        await waitFor(() => expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('confirmation-modal-confirm-btn'));
        await waitFor(() => expect(dispatch.mock.calls.length).toBe(1));
    });

    it('Editor header - change note name', async () => {
        server.use(
            rest.patch(`http://localhost:3001/api/v1/notes/${notes.note.id}`, (req, res, ctx) => res(ctx.json({ test: '2' })))
        );

        fireEvent.change(screen.getByTestId('note-title-input').querySelector('input'), {
            target: { value: 'bonjour' }
        });

        // <!> We have to set the timeout because the title input use a debounce function
        // which wait a second(by default) before fetching
        await waitFor(() => expect(dispatch.mock.calls.length).toBe(1), { timeout: 3000 });
    });
    it('Editor header - no title should show error message and no fetching should occur', async () => {
        server.use(
            rest.patch(`http://localhost:3001/api/v1/notes/${notes.note.id}`, (req, res, ctx) => res(ctx.json({ test: '2' })))
        );

        fireEvent.change(screen.getByTestId('note-title-input').querySelector('input'), {
            target: { value: '' }
        });

        expect(screen.getByText('Titre obligatoire')).toBeInTheDocument();
        // <!> We have to set the timeout because the title input use a debounce function
        // which wait a second(by default) before fetching
        await waitFor(() => expect(dispatch.mock.calls.length).toBe(0), { timeout: 3000 });
    });
});

describe('Editor header - shared notes link modal', () => {
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
                    dispatch: dispatchMain
                }}
            >
                <NoteContext.Provider value={{ notes, dispatch }}>
                    <EditorHeader />
                </NoteContext.Provider>
            </MainContext.Provider>
        );
    });
    it('Editor header - check 3 types of shared note exists', async () => {
        server.use(
            rest.get(`http://localhost:3001/api/v1/notes/${notes.note.id}/shared_notes`, (req, res, ctx) => res(ctx.json({ test: '2' })))
        );
        fireEvent.click(screen.getByTestId('shared-note-share-btn'));
        await waitFor(() => expect(screen.getByTestId('shared-note-modal-body')).toBeInTheDocument());
    });
    it('Editor header - share button click, modal shown', async () => {
        server.use(
            rest.get(`http://localhost:3001/api/v1/notes/${notes.note.id}/shared_notes`, (req, res, ctx) => res(ctx.json({ test: '2' })))
        );
        fireEvent.click(screen.getByTestId('shared-note-share-btn'));
        await waitFor(() => expect(screen.getByTestId('shared-note-modal-body')).toBeInTheDocument());
    });
    it('Editor header - previously created shared notes links displayed', async () => {
        server.use(
            rest.get(`http://localhost:3001/api/v1/notes/${notes.note.id}/shared_notes`, (req, res, ctx) => res(ctx.json(sharedNote)))
        );
        fireEvent.click(screen.getByTestId('shared-note-share-btn'));
        await waitFor(() => expect(screen.getByTestId('shared-note-modal-body')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByTestId('shared-notes-link-list')).toBeInTheDocument());
        sharedNote.forEach((note) => {
        // On check qu'il y ait le titre, le lien et la date
            expect(screen.getByText(`${note.title} ${note.created_at}`)).toBeInTheDocument();
            expect(screen.getByText(`${CONFIG.shared_note_url}/${note.uuid}`)).toBeInTheDocument();
        });
    });
    it('Editor header - Create a note', async () => {
        server.use(
            rest.get(`http://localhost:3001/api/v1/notes/${notes.note.id}/shared_notes`, (req, res, ctx) => res(ctx.json(sharedNote))),
            rest.post('http://localhost:3001/api/v1/shared_notes', (req, res, ctx) => {
                const sNote = { ...sharedNote[0] };
                sNote.title = 'NOUVEAU';
                return res(ctx.json(sNote));
            })
        );
        fireEvent.click(screen.getByTestId('shared-note-share-btn'));
        await waitFor(() => expect(screen.getByTestId('shared-note-modal-body')).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('create-new-link-button'));
        await waitFor(() => expect(screen.getByText(`NOUVEAU ${sharedNote[0].created_at}`)).toBeInTheDocument());
    });
});
describe('Editor header - test title for shared note', () => {
    beforeEach(() => {
        notes.note = { ...notes.note, read_only: true, reference_note: 2 };
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
                    dispatch: dispatchMain
                }}
            >
                <NoteContext.Provider value={{ notes, dispatch }}>
                    <EditorHeader />
                </NoteContext.Provider>
            </MainContext.Provider>
        );
    });
    it('Title - should be disable if readonly note ', async () => {
        expect(screen.getByTestId('note-title-input').querySelector('input').disabled).toBe(true);
    });
    it('Sync button  - should be able if readonly note ', async () => {
        server.use(
            rest.get(`http://localhost:3001/api/v1/notes/read_only/${notes.note.id}`, (req, res, ctx) => res(ctx.json(sharedNote)))
        );
        expect(screen.getByTestId('sync_note_btn').disabled).toBe(false);
        fireEvent.click(screen.getByTestId('sync_note_btn'));
        // Disable button while fetching
        await waitFor(() => expect(screen.getByTestId('sync_note_btn').disabled).toBe(true));

        // Enable button when received response
        await waitFor(() => expect(screen.getByTestId('sync_note_btn').disabled).toBe(false));
        expect(dispatch.mock.calls.length).toBe(1);
    });
    it('Share button  - should be disabled if the note has a parent note ', async () => {
        expect(screen.getByTestId('shared-note-share-btn').disabled).toBe(true);
    });
});
describe('Editor header - lock=true', () => {
    beforeEach(() => {
        notes.note = {
            ...notes.note, lock: true, reference_note: 2, has_mirror: true
        };
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
                    dispatch: dispatchMain
                }}
            >
                <NoteContext.Provider value={{ notes, dispatch }}>
                    <EditorHeader />
                </NoteContext.Provider>
            </MainContext.Provider>
        );
    });
    it('Title - should be disable if lock note ', async () => {
        expect(screen.getByTestId('note-title-input').querySelector('input').disabled).toBe(true);
    });
    it('Sync button  - should be able if lock note', async () => {
        server.use(
            rest.get(`http://localhost:3001/api/v1/notes/read_only/${notes.note.id}`, (req, res, ctx) => res(ctx.json(sharedNote)))
        );
        expect(screen.getByTestId('sync_note_btn').disabled).toBe(false);
        fireEvent.click(screen.getByTestId('sync_note_btn'));
        // Disable button while fetching
        await waitFor(() => expect(screen.getByTestId('sync_note_btn').disabled).toBe(true));

        // Enable button when received response
        await waitFor(() => expect(screen.getByTestId('sync_note_btn').disabled).toBe(false));
        expect(dispatch.mock.calls.length).toBe(1);
    });
    it('Lock button  - should be present when it\'s a mirror note', async () => {
        expect(screen.getByTestId('lock_note_btn').disabled).toBe(false);
    });
});
describe('Editor header - lock=false', () => {
    beforeEach(() => {
        notes.note = {
            ...notes.note, lock: false, reference_note: 2, has_mirror: true, read_only: false
        };
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
                    dispatch: dispatchMain
                }}
            >
                <NoteContext.Provider value={{ notes, dispatch }}>
                    <EditorHeader />
                </NoteContext.Provider>
            </MainContext.Provider>
        );
    });
    it('Title - should be able if lock note is true', async () => {
        expect(screen.getByTestId('note-title-input').querySelector('input').disabled).toBe(false);
    });
    it('Sync button  - should be disable if lock note is false ', async () => {
        server.use(
            rest.get(`http://localhost:3001/api/v1/notes/read_only/${notes.note.id}`, (req, res, ctx) => res(ctx.json(sharedNote)))
        );
        expect(screen.getByTestId('sync_note_btn').disabled).toBe(true);
    });
});
