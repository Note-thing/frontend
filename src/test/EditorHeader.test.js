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
Object.defineProperty(window, 'localStorage', mockStorage);

// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    useParams: () => ({ directoryId: '123' }),
    useHistory: () => {}
}));

const notes = MOCK_DATA;
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
    fireEvent.click(screen.getByTestId('editor-header-delete-btn'));
    await waitFor(() => expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('confirmation-modal-confirm-btn'));
    await waitFor(() => expect(dispatch.mock.calls.length).toBe(1));
});
