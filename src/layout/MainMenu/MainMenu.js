import React, { useContext, useCallback } from 'react';
import {
    List, Grid, Input
} from '@mui/material';
import { MainContext } from '../../context/MainContext';
import { NoteContext } from '../../context/NoteContext';
import User from './User';
import MainMenuItem from './MainMenuItem';

/**
 * Main menu of the application (left panel with directories, notes, search and access
 * to user parameters)
 * @param {*} props
 * @returns
 */
export default function MainMenu() {
    const { main: { user } } = useContext(MainContext);
    const { notes: { directories, directory } } = useContext(NoteContext);
    return (
        <Grid
            container
            sx={{ height: '100%' }}
            display="flex"
            direction="column"
            justifyContent="space-between"
        >
            <Grid sx={{ height: '80%', overflowY: 'scroll' }}>
                <List>
                    {directories.map((dir) => (
                        <MainMenuItem
                            key={dir.uniqid}
                            show={directory && dir.uniqid === directory.uniqid}
                            directory={dir}
                        />
                    ))}
                </List>
            </Grid>
            <Grid
                container
                sx={{
                    padding: '1rem',
                    height: '20%',
                    alignSelf: 'flex-end'
                }}
            >
                <Input
                    sx={{ width: '100%', marginBottom: '1rem' }}
                    placeholder="Rechercher dans les notes"
                />
                <User user={user} />
            </Grid>
        </Grid>
    );
}
