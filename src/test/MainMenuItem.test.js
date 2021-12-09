import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MainMenuItem from '../layout/MainMenu/MainMenuItem';

let rootContainer = null;
// TODO voir comment faire des vrais mocks
const mockDirectory = {
    name: 'WEB',
    notes: [{ title: 'JS', tags: ['JS', 'Jest.js'] }]
};
beforeEach(() => {
    // setup a DOM element as a render target
    rootContainer = document.createElement('div');
    document.body.appendChild(rootContainer);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(rootContainer);
    rootContainer.remove();
    rootContainer = null;
});

it('Main menu item should display the directory and its notes', () => {
    act(() => {
        render(<MainMenuItem directory={mockDirectory} />, rootContainer);
    });

    const listItem = rootContainer.querySelector(
        '[data-testid=MainMenu-directoryItem]'
    );
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

it('MainMenuItem should display (opacity = 1, height : auto) notes on click', () => {
    act(() => {
        render(<MainMenuItem directory={mockDirectory} />, rootContainer);
    });

    const listItem = rootContainer.querySelector(
        '[data-testid=MainMenu-directoryItem]'
    );

    // Check the notes list isn't visible
    const notesList = rootContainer.querySelector(
        '[data-testid=MainMenu-notesList]'
    );
    expect(window.getComputedStyle(notesList).opacity).toBe('0');

    act(() => {
        listItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // Check the notes list IS visible
    expect(window.getComputedStyle(notesList).opacity).toBe('1');

    mockDirectory.notes.forEach((note, noteIdx) => {
        const noteItem = rootContainer.querySelector(
            `[data-testid=MainMenu-notesList-item-${noteIdx}]`
        );
        expect(noteItem.querySelector('span').textContent).toBe(note.title);
        note.tags.forEach((tag, tagIdx) => {
            expect(
                noteItem.querySelector(
                    `[data-testid=MainMenu-notesList-item-tag-${tagIdx}]`
                ).textContent
            ).toBe(tag);
        });
    });
});
it('Presentation CI/CD', () => {
    expect('bonjour').toBe('bonjour');
});
