import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './AppLayout.css';
import MainMenu from './MainMenu/MainMenu';
import Editor from './editor/Editor';
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
        <NoteProvider>
            <Grid container height="100vh">
                <Grid
                    item
                    xs={3}
                    height="100%"
                    borderRight="0.1rem solid #e9F0F0"
                >
                    <MainMenu />
                </Grid>
                <Grid item xs={9} height="100%">
                    <Switch>
                        <Route path="/directory/**/note/**" component={EditorComponent} />
                        <Route path="/shared_notes/:uuid" component={SharedNoteComponent} />
                    </Switch>
                </Grid>
            </Grid>
        <NoteProvider initialState={noteInitialState}>
        </NoteProvider>
    );
}
