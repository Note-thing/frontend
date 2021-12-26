import React from 'react';
import { Grid, Input, Button } from '@mui/material';
import {

    Preview,
    VerticalSplit,
    PictureAsPdf,
    Share,
    Delete
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import { ReactComponent as Code } from '../../resource/icons/editor-viewmode-code.svg';
import { ReactComponent as View } from '../../resource/icons/editor-viewmode-view.svg';
import { ReactComponent as Split } from '../../resource/icons/editor-viewmode-split.svg';

/**
 * Header of the editor containing the note menu (display switch, PDF export, delete the note etc.).
 * @returns
 */
export default function EditorHeader({ setPreviewWidth }) {
    const handleViewModeClick = (width) => setPreviewWidth(width);
    return (
        <Grid
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="0 1rem 0 1rem"
            borderBottom="0.1rem solid #e9f0f0"
        >
            <Grid display="flex" justifyContent="space-around">
                <Button size="small" onClick={() => handleViewModeClick(0)}>
                    <Code />
                </Button>
                <Button size="small" onClick={() => handleViewModeClick(50)}>
                    <Split />
                </Button>
                <Button size="small" onClick={() => handleViewModeClick(100)}>
                    <View />
                </Button>
            </Grid>

            <Input
                className="noBorderInput"
                sx={{ width: '10rem', fontSize: '1.2rem' }}
                value="07.11.2021"
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

EditorHeader.propTypes = {
    setPreviewWidth: PropTypes.func.isRequired
};
