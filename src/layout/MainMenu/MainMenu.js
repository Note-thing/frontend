import React, { useContext } from 'react';
import {
    List, Grid, Input
} from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { MainContext } from '../../context/MainContext';
import User from './User';
import MainMenuItem from './MainMenuItem';

/**
 * Main menu of the application (left panel with directories, notes, search and access
 * to user parameters)
 * @param {*} props
 * @returns
 */
export default function MainMenu() {
    const { main: { user }, dispatch} = useContext(MainContext);
    const notesDirectories = [
        {
            name: 'TWEB',
            notes: [
                { title: 'CSS', tags: ['Web', 'design '] },
                { title: 'JS', tags: ['JS', 'prototype'] },
                { title: 'Node', tags: ['JS', 'SSR'] }
            ]
        },
        {
            name: 'PDG',
            notes: [
                { title: 'Note-thing', tags: ['Web', 'design'] },
                { title: 'Ruby on Rails', tags: ['Model', 'Controller'] },
                { title: 'CI/CD', tags: ['Jest.js', 'Unit test'] }
            ]
        },
        {
            name: 'AMT',
            notes: [
                { title: 'Guide de survie total', tags: ['Spring'] },
                { title: 'Survire en haute mer', tags: ['Spring', 'MVC'] },
                {
                    title: 'Apprendre à utiliser une boussole',
                    tags: ['Navigation']
                }
            ]
        }
    ];
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
                    {notesDirectories.map((dir, idx) => (
                        <MainMenuItem key={idx} directory={dir} />
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
