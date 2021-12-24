import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './AppLayout.css';
import MainMenu from './MainMenu/MainMenu';
import Editor from './editor/Editor';
import { NoteProvider } from '../context/NoteContext';
import noteInitialState from '../context/state/noteState';

/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout() {
    return (
        <NoteProvider noteInitialState={noteInitialState}>
            <MainMenu />
            <Switch>
                <Route path="/directory/**/note/**" component={Editor} />
            </Switch>
        </NoteProvider>
    );
}
