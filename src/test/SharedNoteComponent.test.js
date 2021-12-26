import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { NoteContext } from '../context/NoteContext';
import SharedNoteComponent from '../layout/sharedNote/SharedNoteComponent';
import MOCK_DATA from './data';

const server = setupServer(
    rest.post('http://localhost:3001/api/v1/shared_notes/123/copy', (req, res, ctx) =>
        res(ctx.json({ greeting: 'hello there' }))
    )
);
const open = jest.fn();
Object.defineProperty(window, 'options', { offset: 210 });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    useParams: () => ({ uuid: '123' })
}));

const notes = MOCK_DATA;
const dispatch = jest.fn((type, data) => {
    if (type === 'update_directory') {
        notes.directories.append(data);
    }
});

test('Display user directory in the dropdown', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/shared_notes/123/copy', (req, res, ctx) => {
            res(ctx.status(200));
        })
    );

    act(() => {
        render(
            <NoteContext.Provider value={{ notes, dispatch }}>
                <SharedNoteComponent />
            </NoteContext.Provider>
        );
        fireEvent.click(screen.getByText('Copier'));
    });
    await waitFor(() =>
        expect(screen.getByText('La copie de la note a bien été effectuée')).toBeInTheDocument()
    );
});

test('handles server error', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/shared_notes/123/copy', (req, res, ctx) =>
            res(ctx.status(422))
        )
    );

    act(() => {
        render(
            <NoteContext.Provider value={{ notes, dispatch }}>
                <SharedNoteComponent />
            </NoteContext.Provider>
        );
        fireEvent.click(screen.getByText('Copier'));
    });
    await waitFor(() =>
        expect(screen.getByText('Un problème est survenu lors de la copie')).toBeInTheDocument()
    );
});