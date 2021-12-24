import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NoteProvider } from '../context/NoteContext';
import Editor from '../layout/editor/Editor';
import noteInitialState from '../context/state/noteState';

it('Editor Component | Renders correctly', () => {
    const { queryByTestId, queryByPlaceholderName } = render(
        <NoteProvider noteInitialState={noteInitialState}>
            <Editor />
        </NoteProvider>
    );
    expect(queryByTestId('editor-component')).toBeTruthy();
});
