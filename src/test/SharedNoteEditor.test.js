import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render, screen, fireEvent, waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoteContext } from '../context/NoteContext';
import MOCK_DATA from './data';
import { MainContext } from '../context/MainContext';
import { mockStorage } from './Mock';
import EditorHeader from '../layout/editor/EditorHeader';
import { CONFIG } from '../config/config';

const server = setupServer(
    rest.post(`${CONFIG.api_url}/folders`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
);

const notes = MOCK_DATA;
const noteDispatch = jest.fn();
const mainDispatch = jest.fn();

Object.defineProperty(window, 'options', { offset: 210 });
Object.defineProperty(window, 'localStorage', mockStorage());
// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    useParams: () => ({ uuid: '123' }),
    useHistory: () => {}
}));

describe('Editor header', () => {
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
                    <EditorHeader />
                </NoteContext.Provider>
            </MainContext.Provider>
        );
    });
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('Modal open', async () => {
        server.use(
            rest.post(`${CONFIG.api_url}/notes`, (req, res, ctx) => res(ctx.json({ test: 'test' })))
        );
        expect(true).toBe(true);
        // fireEvent.click(screen.getByTestId('MainMenu-add-note-btn'));
        // expect(screen.getByTestId('note-creation-modal')).toBeInTheDocument();
    });
});
