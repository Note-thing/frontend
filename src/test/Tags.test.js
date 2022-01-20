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
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router';
import { NoteProvider } from '../context/NoteContext';
import EditorFooter from '../layout/editor/EditorFooter';
import MOCK_DATA from './data';
import { MainProvider } from '../context/MainContext';
import { mockStorage } from './Mock';

const server = setupServer(
    rest.post('http://localhost:3001/api/v1/tags', (req, res, ctx) => res(ctx.json({ test: 'test' })))
);

enableFetchMocks();

// Mock useParams used in SharedNoteComponent
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'localhost:3000/directory/1/note/5'
    }),
    useHistory: () => ({
        push: (where) => `localhost:3000${where}`
    })
}));

Object.defineProperty(window, 'location', {
    value: {
        pathname: 'localhost:3000/directory/1/note/5'
    }
});

Object.defineProperty(window, 'localStorage', mockStorage());

/* beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); */

// const notes = MOCK_DATA;
// const dispatch = jest.fn();
describe('Footer Component', () => {
    beforeEach(async () => {
        fetch.mockResponses(
            [
                JSON.stringify(MOCK_DATA.directories),
                { status: 200 }
            ]
        );
        render(
            <MemoryRouter initialEntries={['/directory/1/note/5']}>
                <MainProvider>
                    <NoteProvider>
                        <EditorFooter />
                    </NoteProvider>
                </MainProvider>
            </MemoryRouter>
        );
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    });
    it('Tags Creation - The modal show on click', async () => {
        fireEvent.click(screen.getByTestId('editor-footer-add-tags-btn'));

        expect(screen.getByTestId('editor-dialog-add-tags')).toBeInTheDocument();
    });

    it('Tags Creation - From the opened modal, we can add a tag that is displayed', async () => {
        server.use(
            rest.post('http://localhost:3001/api/v1/tags', (req, res, ctx) => res(ctx.json({ title: 'MonNouveauTag', id: 88 })))
        );

        fireEvent.click(screen.getByTestId('editor-footer-add-tags-btn'));

        expect(screen.getByTestId('editor-dialog-add-tags')).toBeInTheDocument();

        fireEvent.change(screen.getByTestId('editor-dialog-add-tags').querySelector('input'), {
            target: { value: 'MonNouveauTag' }
        });

        fireEvent.keyPress(screen.getByTestId('editor-dialog-add-tags').querySelector('input'), {
            key: 'Enter', code: 13, charCode: 13
        });

        await waitFor(() => expect(screen.getByTestId('editor-tags-tag-MonNouveauTag')).toBeInTheDocument(), { timeout: 5000 });

        /*fireEvent.click(screen.getByTestId('folder-creation-button'));
        await waitForElementToBeRemoved(() => screen.getByTestId('folder-creation-modal'));
        expect(dispatch.mock.calls.length).toBe(1); */
    });
});
