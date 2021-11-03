import React from 'react';
import { Grid, Input } from '@mui/material';
import {
    Code,
    Preview,
    VerticalSplit,
    PictureAsPdf,
    Share,
    Delete
} from '@mui/icons-material';

/**
 * Header of the editor containing the note menu (display switch, PDF export, delete the note etc.).
 * @returns
 */
export default function EditorHeader() {
    return (
        <Grid
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="0 1rem 0 1rem"
            borderBottom="0.1rem solid #e9f0f0"
        >
            <Grid display="flex" justifyContent="space-around" width="10%">
                <Code className="menu-icon-item" />
                <Preview className="menu-icon-item" />
                <VerticalSplit className="menu-icon-item" />
            </Grid>

            <Input
                className="noBorderInput"
                sx={{ width: '30rem', fontSize: '1.2rem' }}
                value=" Guide de survie durant le III Rentsch"
                placeholder="Titre de la note"
            />

            <Grid display="flex" justifyContent="space-around" width="10%">
                <Share className="menu-icon-item" />
                <PictureAsPdf className="menu-icon-item" />
                <Delete className="menu-icon-item" />
            </Grid>
        </Grid>
    );
}
