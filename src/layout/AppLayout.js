import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainMenu from './MainMenu/MainMenu';
import EditorComponent from './editor/Editor';
import { NoteProvider } from '../context/NoteContext';
import SharedNoteComponent from './sharedNote/SharedNoteComponent';
import DirectoryComponent from './directory/DirectoryComponent';
import WelcomeComponent from './MainMenu/WelcomeComponent';
import Profile from './profile/Profile';
import '../resource/css/main.css';
import EditorTutorial from './editor/EditorTutorial';

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
                    <Route exact path="/" component={WelcomeComponent} />
                    <Route exact path="/tutorial" component={EditorTutorial} />
                    <Route exact path="/directory/:directoryId" component={DirectoryComponent} />
                    <Route path="/directory/**/note/**" component={EditorComponent} />
                    <Route path="/shared_notes/:uuid" component={SharedNoteComponent} />
                    <Route exactr path="/profile" component={Profile} />
                </Switch>
            </section>
        </NoteProvider>
    );
}
