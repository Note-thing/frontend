import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import MOCK_DATA from './data';
import { Get, Post } from '../config/config';
import { mockStorage } from './Mock';

const server = setupServer(
    rest.get('http://localhost:3001/api/v1/note', (req, res, ctx) => res(ctx.json({ test: 'test' })))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Object.defineProperty(window, 'options', { offset: 210 });
Object.defineProperty(window, 'localStorage', mockStorage());

jest.mock('react-router-dom', () => ({
    useParams: () => ({ uuid: '123' }),
    useHistory: () => {}
}));

const notes = MOCK_DATA;

it('GET - The client should get remote data', async () => {
    server.use(
        rest.get('http://localhost:3001/api/v1/note', (req, res, ctx) => res(ctx.json(notes.directories[0])))
    );

    const note = await waitFor(() => Get('/note'));
    expect(note === notes.directories[0]);
});

it('POST - The client should post data and then get his data back', async () => {
    server.use(
        rest.post('http://localhost:3001/api/v1/note', (req, res, ctx) => res(ctx.json(notes.directories[0])))
    );

    const note = await waitFor(() => Post('/note', notes.directories[0]));
    expect(note === notes.directories[0]);
});
