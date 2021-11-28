import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import './AppLayout.css';
import MainMenu from './MainMenu/MainMenu';
import EditorComponent from './editor/EditorComponent';
import { NoteProvider } from '../context/NoteContext';

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
                    </Switch>
                </Grid>
            </Grid>
        </NoteProvider>
    );
}
