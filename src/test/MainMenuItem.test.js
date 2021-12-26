import React from 'react';
import { act } from 'react-dom/test-utils';
import {
    fireEvent, render, screen, waitFor
} from '@testing-library/react';
import { NoteContext } from '../context/NoteContext';
import MainMenuItem from '../layout/MainMenu/MainMenuItem';
import DEFAULT_MOCK_DATA from './data';

const rootContainer = null;
// TODO voir comment faire des vrais mocks
const mockDirectory = {
    name: 'WEB',
    uniqid: 'ajskldfjasdlkf-sadfsadf',
    notes: [{ title: 'JS', tags: ['JS', 'Jest.js'] }]
};
const notes = DEFAULT_MOCK_DATA;

const dispatch = jest.fn((type, data) => {
    if (type === 'update_directory') {
        notes.directories.append(data);
    }
});
const useHistory = jest.fn((type, data) => {
    if (type === 'update_directory') {
        notes.directories.append(data);
    }
});

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: () => ''
    })
}));

test('Main menu item should display the directory and its notes', () => {
    act(() => {
        render(
            <NoteContext.Provider value={{ notes, dispatch }}>
                <MainMenuItem uniqid={mockDirectory.uniqid} show directory={mockDirectory} />
            </NoteContext.Provider>
        );
    });

    const listItem = screen.getByTestId('MainMenu-directoryItem');
    expect(listItem.querySelector('span').textContent).toBe(mockDirectory.name);
    expect(listItem.querySelector('p').textContent).toBe(
        mockDirectory.notes
            .map((note) => note.title)
            .join(' - ')
            .concat('...')
    );
    expect(listItem.querySelector('p').textContent).toBe(
        mockDirectory.notes
            .map((note) => note.title)
            .join(' - ')
            .concat('...')
    );
});

test('MainMenuItem should display (opacity = 1, height : auto) notes on click', async () => {
    act(() => {
        render(
            <NoteContext.Provider value={{ notes, dispatch }}>
                <MainMenuItem uniqid={mockDirectory.uniqid} show directory={mockDirectory} />
            </NoteContext.Provider>
        );
    });

    const listItem = screen.getByTestId('MainMenu-directoryItem');

    // Check the notes list isn't visible
    const notesList = screen.getByTestId('MainMenu-notesList');

    expect(window.getComputedStyle(notesList).opacity).toBe('1');

    act(() => {
        fireEvent.click(listItem);
    });

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
