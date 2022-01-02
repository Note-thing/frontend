import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import { act } from 'react-dom/test-utils';
import {
    fireEvent, render, screen, waitFor, cleanup
} from '@testing-library/react';

import { MainProvider } from '../context/MainContext';
import { NoteProvider } from '../context/NoteContext';
import MainMenu from '../layout/MainMenu/MainMenu';
import DEFAULT_MOCK_DATA from './data';

const stateChangeWait = () => new Promise((r) => setTimeout(r, 1000));

enableFetchMocks();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'localhost:3000/directory/1'
    }),
    useHistory: () => ({
        push: (where) => `localhost:3000${where}`
    })
}));

Object.defineProperty(window, 'location', {
    value: {
        pathname: 'localhost:3000/directory/1'
    }
});

Object.defineProperty(window, 'localStorage', {
    value: (function () {
        let store = {
            User: '{"email":"note-thing@pm.me","isAuthenticated":true}',
            Token: 'éo234h5élk34hn5ékh35é23h5li23h45liu32h5i3h5ii2l34h5hl2i45'
        };
        return {
            getItem(key) {
                return store[key];
            },
            setItem(key, value) {
                store[key] = value.toString();
            },
            clear() {
                store = {};
            }
        };
    }())
});

const app = () => render(
    <MainProvider>
        <NoteProvider>
            <MainMenu />
        </NoteProvider>
    </MainProvider>
);
let menuItems;
let listItem;
let notesLists;

describe('Main Menu Component', () => {
    beforeAll(async () => {
        // testing layout
        fetch.mockResponses(
            [
                JSON.stringify(DEFAULT_MOCK_DATA.directories),
                { status: 200 }
            ]
        );
        app();
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        menuItems = screen.queryAllByTestId('MainMenu-directoryItem');
        notesLists = screen.queryAllByTestId('MainMenu-notesList');
        // testing layout
    });
    afterAll(() => {
        cleanup();
        fetch.resetMocks();
    });
    it('Main menu item should display the directory and its notes', () => {
        expect(menuItems[0].querySelector('span').textContent).toBe(DEFAULT_MOCK_DATA.directory.title);
        expect(menuItems[0].querySelector('p').textContent).toBe(
            DEFAULT_MOCK_DATA.directory.notes
                .map((note) => note.title)
                .join(' - ')
                .concat('...')
        );
        expect(menuItems[0].querySelector('p').textContent).toBe(
            DEFAULT_MOCK_DATA.directory.notes
                .map((note) => note.title)
                .join(' - ')
                .concat('...')
        );
    });

    it('MainMenuItem should display (opacity = 1, height : auto) notes on click', async () => {
        // Check the notes list isn't visible
        expect(window.getComputedStyle(notesLists[0]).opacity).toBe('1');
        expect(window.getComputedStyle(notesLists[1]).opacity).toBe('0');
        act(() => {
            fireEvent.click(menuItems[0]);
        });
        await stateChangeWait();
        await waitFor(expect(window.getComputedStyle(notesLists[0]).opacity).toBe('0'));

        // TODO : Stéfan: répare le test ou fais en un autre ou ...
        // Ne fonctionnera pas ... la logique d'affichage ayant changé (A voir avec Stéfan)
        // await waitFor(expect(window.getComputedStyle(notesList).opacity).toBe('0'));
        // // Check the notes list IS visible

    // mockDirectory.notes.forEach((note, noteIdx) => {
    //     const noteItem = rootContainer.querySelector(
    //         `[data-testid=MainMenu-notesList-item-${noteIdx}]`
    //     );
    //     expect(noteItem.querySelector('span').textContent).toBe(note.title);
    //     note.tags.forEach((tag, tagIdx) => {
    //         expect(
    //             noteItem.querySelector(`[data-testid=MainMenu-notesList-item-tag-${tagIdx}]`)
    //                 .textContent
    //         ).toBe(tag);
    //     });
    // });
    });
});
