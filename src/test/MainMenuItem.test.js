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

const menu = new Map();

describe('Main Menu Component', () => {
    beforeAll(async () => {
        // testing layout
        fetch.mockResponses(
            [
                JSON.stringify(DEFAULT_MOCK_DATA.directories),
                { status: 200 }
            ]
        );
        const { getByTestId, getAllByRole } = render(
            <MainProvider>
                <NoteProvider>
                    <MainMenu />
                </NoteProvider>
            </MainProvider>
        );
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        // eslint-disable-next-line no-restricted-syntax
        for (const item of DEFAULT_MOCK_DATA.directories) {
            menu.set(item.id, {
                directory: getByTestId('MainMenu-directoryItem'.concat(item.id)),
                notes: getByTestId('MainMenu-notesList'.concat(item.id))
            });
        }
        // testing layout
    });
    it('Main menu item should display the directory and its notes', () => {
        expect(menu.get(1).directory.querySelector('span').textContent).toBe(DEFAULT_MOCK_DATA.directory.title);
        expect(menu.get(1).directory.querySelector('p').textContent).toBe(
            DEFAULT_MOCK_DATA.directory.notes
                .map((note) => note.title)
                .join(' - ')
                .concat('...')
        );
        expect(menu.get(1).directory.querySelector('p').textContent).toBe(
            DEFAULT_MOCK_DATA.directory.notes
                .map((note) => note.title)
                .join(' - ')
                .concat('...')
        );

        expect(menu.get(2).directory.querySelector('span').textContent).toBe(DEFAULT_MOCK_DATA.directories[1].title);
        expect(menu.get(2).directory.querySelector('p').textContent).toBe(
            DEFAULT_MOCK_DATA.directories[1].notes
                .map((note) => note.title)
                .join(' - ')
                .concat('...')
        );
        expect(menu.get(2).directory.querySelector('p').textContent).toBe(
            DEFAULT_MOCK_DATA.directories[1].notes
                .map((note) => note.title)
                .join(' - ')
                .concat('...')
        );
    });

    it('MainMenuItem should display (opacity = 1, height : auto) notes on click', async () => {
        // Check the notes list isn't visible
        expect(window.getComputedStyle(menu.get(1).notes).opacity).toBe('1');
        expect(window.getComputedStyle(menu.get(2).notes).opacity).toBe('0');
        screen.debug(menu.get(2).directory, 300000);
        fireEvent.click(menu.get(2).directory);
        // await stateChangeWait();
        await waitFor(() => expect(window.getComputedStyle(menu.get(1).notes).opacity).toBe('0'));

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
