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

it('Editor header - delete note', async () => {
    server.use(
        rest.delete(`http://localhost:3001/api/v1/notes/${notes.note.id}`, (req, res, ctx) => res(ctx.json({ test: '2' })))
    );
    server.use(
        rest.get(`http://localhost:3001/api/v1/notes/${notes.note.id}/shared_notes`, (req, res, ctx) => res(ctx.json(sharedNote)))
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
