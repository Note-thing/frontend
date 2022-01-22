import React, { useContext } from 'react';
import {
    List, Grid
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { MainContext } from '../../context/MainContext';
import { NoteContext } from '../../context/NoteContext';
import User from './User';
import MainMenuItem from './MainMenuItem';
import FolderCreation from '../directory/FolderCreation/FolderCreation';
import SearchComponent from '../search/SearchComponent';
/**
 * Main menu of the application (left panel with directories, notes, search and access
 * to user parameters)
 * @param {*} props
 * @returns
 */
export default function MainMenu() {
    const location = useLocation();
    // List of URLS for which the menu should be opened.
    const OPENED_URL = ['/'];
    const { main: { user } } = useContext(MainContext);
    const { notes: { directories, directory } } = useContext(NoteContext);
    return (
        <section className={`main-menu-container ${OPENED_URL.includes(location.pathname) ? 'open' : ''}`}>
            <Grid
                container
                className="main-menu"
                sx={{ height: '100%', width: '100%' }}
                display="flex"
                direction="column"
                justifyContent="space-between"
            >
                <Grid className="main-menu-scrollable">
                    <List>
                        { directories?.map((dir) => (
                            <MainMenuItem
                                key={dir.id}
                                show={directory && dir.id === directory.id}
                                directory={dir}
                            />
                        ))}
                        <FolderCreation />
                    </List>
                </Grid>
                <Grid
                    container
                    sx={{
                        padding: '1rem',
                        height: '15%',
                        alignSelf: 'flex-end'
                    }}
                >

                    <SearchComponent />
                    <User user={user} />
                </Grid>
            </Grid>
        </section>
    );
}
