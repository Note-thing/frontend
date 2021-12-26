import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
    fireEvent
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { NoteProvider } from '../context/NoteContext';
import MainMenuItem from '../layout/MainMenu/MainMenuItem';
import DEFAULT_MOCK_DATA from './data';

const stateChangeWait = () => new Promise((r) => setTimeout(r, 300));

let rootContainer = null;
// TODO voir comment faire des vrais mocks
const mockDirectory = {
    uniqid: '619f6488babbf',
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

const menuItem = (show) => render(
    <NoteProvider initialState={{
        directory: {
            uniqid: '619f6488babbf'
        },
        directories: [{
            uniqid: '619f6488babbf',
            name: 'TWEB',
            notes: [
                { uniqid: 'awei546fcguuz', title: 'JS', tags: ['JS', 'prototype'] },
                { uniqid: '345jfhtzdffvret', title: 'Node', tags: ['JS', 'SSR'] }
            ]
        }]
    }}
    >
        <MainMenuItem directory={mockDirectory} show={show} />
    </NoteProvider>, rootContainer
);

it('Main menu item should display the directory and its notes', () => {
    menuItem(true);

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
/*
it('MainMenuItem should display (opacity = 1, height : auto) notes on click', async () => {
    menuItem(false);

    const listItem = rootContainer.querySelector(
        '[data-testid=MainMenu-directoryItem]'
    );

    // Check the notes list isn't visible
    const notesList = screen.getByTestId('MainMenu-notesList');

    expect(window.getComputedStyle(notesList).opacity).toBe('1');

    act(() => {
        fireEvent.click(listItem);
    });
    await stateChangeWait();
    // Check the notes list IS visible
    expect(window.getComputedStyle(notesList).opacity).toBe('1');

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
*/
it('Presentation CI/CD', () => {
    expect('bonjour').toBe('bonjour');
});
