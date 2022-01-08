import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainMenu from './MainMenu/MainMenu';
import EditorComponent from './editor/Editor';
import { NoteProvider } from '../context/NoteContext';
import SharedNoteComponent from './sharedNote/SharedNoteComponent';
import DirectoryComponent from './directory/DirectoryComponent';
import '../resource/css/main.css';

/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout() {
    return (
        <NoteProvider>
            <MainMenu />
            <section className="main">
                <Switch>
                    <Route exact path="/directory/:directoryId" component={DirectoryComponent} />
                    <Route path="/directory/**/note/**" component={EditorComponent} />
                    <Route path="/shared_notes/:uuid" component={SharedNoteComponent} />
                </Switch>
            </section>
        </NoteProvider>
    );
}
