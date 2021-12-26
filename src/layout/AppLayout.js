import React from 'react';
import { Grid } from '@mui/material';
import { Switch, Route } from 'react-router-dom';
import './AppLayout.css';
import MainMenu from './MainMenu/MainMenu';
import EditorComponent from './editor/Editor';
import { NoteProvider } from '../context/NoteContext';
import SharedNoteComponent from './sharedNote/SharedNoteComponent';
import noteInitialState from '../context/state/noteState';

/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout() {
    return (
        <NoteProvider initialState={noteInitialState}>
            <MainMenu />
            <Switch>
                <Route path="/directory/**/note/**" component={EditorComponent} />
                <Route path="/shared_notes/:uuid" component={SharedNoteComponent} />
            </Switch>
        </NoteProvider>
    );
}
