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
import EditorHeader from '../layout/editor/EditorHeader';
import MOCK_DATA from './data';
import { MainContext } from '../context/MainContext';

const server = setupServer(
    rest.delete('http://localhost:3001/api/v1/folders/61ddfgg488babbf', (req, res, ctx) => res(ctx.json({ test: 'test' })))
);
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

// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    useParams: () => ({ directoryId: '123' }),
    useHistory: () => {}
}));

const notes = MOCK_DATA;

it('Editor header - delete note', async () => {
    server.use(
        rest.delete('http://localhost:3001/api/v1/notes/dfg456fgh456', (req, res, ctx) => res(ctx.json({ test: '2' })))
    );
    server.use(
        rest.get('http://localhost:3001/api/v1/notes/dfg456fgh456/shared_notes', (req, res, ctx) => res(ctx.json({ test: '2' })))
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
                <EditorHeader  />
            </NoteContext.Provider>
        </MainContext.Provider>
    );
    fireEvent.click(screen.getByTestId('editor-header-delete-btn'));
    await waitFor(() => expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('confirmation-modal-confirm-btn'));
    await waitFor(() => expect(dispatch.mock.calls.length).toBe(1));
});
