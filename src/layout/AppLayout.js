import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import './AppLayout.css';
import MainMenu from './MainMenu/MainMenu';
import Editor from './editor/Editor';
import { NoteProvider } from '../context/NoteContext';

/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout() {
    return (
        <NoteProvider>
            <MainMenu />
            <Switch>
                <Route path="/directory/**/note/**" component={Editor} />
            </Switch>
        </NoteProvider>
    );
}
