import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NoteProvider } from '../context/NoteContext';
import Editor from '../layout/editor/Editor';
import noteInitialState from '../context/state/noteState';

const { container, queryByTestId, queryByPlaceholderName } = render(
    <NoteProvider initialState={{
        note: {
            uniqid: 'dfgh3245sdfg',
            title: 'CSS',
            tags: ['Web', 'design'],
            content: '# Getting Started with Create React App'
        },
        directories: [{
            uniqid: '619f6488babbf',
            name: 'TWEB',
            notes: [
                {
                    uniqid: 'dfgh3245sdfg',
                    title: 'CSS',
                    tags: ['Web', 'design'],
                    content: '# Getting Started with Create React App'
                }]
        }]
    }}
    >
        <Editor />
    </NoteProvider>
);
describe("Editor Component", () => {
    it('All layout components present', () => {
        // testing layout
        expect(queryByTestId('editor-component')).toBeTruthy();
        expect(queryByTestId('resize-pannel')).toBeTruthy();
        expect(container.getElementsByClassName('editor').length).toBe(1);
        expect(container.getElementsByClassName('editor-textarea').length).toBe(1);
        expect(container.getElementsByClassName('preview-pannel').length).toBe(1);
    });

    it('All layout components present', () => {
        // testing layout
        expect(queryByTestId('resize-pannel')).toBeTruthy();
        const resizePannel = queryByTestId('resize-pannel');
        //expect(resizePannel.getElementsByClassName('pannel-resizable').length).toBe(2);
    });
});
