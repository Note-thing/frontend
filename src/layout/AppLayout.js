import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainMenu from './MainMenu/MainMenu';
import EditorComponent from './editor/Editor';
import { NoteProvider } from '../context/NoteContext';
import SharedNoteComponent from './sharedNote/SharedNoteComponent';
import DirectorySettingsComponent from './DirectorySettings/DirectorySettingsComponent';
import { MainContext } from '../context/MainContext';
import '../resource/css/main.css';

/**
 * Layout of the application
 * @param {*} props
 * @returns
 */
export default function AppLayout() {
    const { main, dispatch } = useContext(MainContext);
    return (
        <NoteProvider user={main.user} mainDispatch={dispatch}>
            <MainMenu />
            <section className="main">
                <Switch>
                    <Route path="/directory/:directoryId/settings" component={DirectorySettingsComponent} />
                    <Route path="/directory/**/note/**" component={EditorComponent} />
                    <Route path="/shared_notes/:uuid" component={SharedNoteComponent} />
                </Switch>
            </section>
        </NoteProvider>
    );
}
