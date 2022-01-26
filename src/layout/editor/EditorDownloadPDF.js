import React from 'react';
import { IconButton } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { JsPDF } from 'jspdf';

/**
 * Button permitting the user to genrate a PDF from his html.
 * @returns
 */
export default function EditorDownloadPDF({ noteTitle }) {
    const handleClick = () => {
        const preview = document.querySelector('div#preview');
        const fullWidth = 210;
        const margin = 5;
        const pdf = new JsPDF();

        pdf.html(preview, {
            callback: (doc) => {
                doc.save(noteTitle);
            },
            autoPaging: 'text',
            margin,
            filename: noteTitle,
            width: fullWidth - 2 * margin,
            windowWidth: 900
        });
    };

    return (
        <IconButton
            color="primary"
            label="Exporter en PDF"
            onClick={handleClick}
        >
            <PictureAsPdf />
        </IconButton>
    );
}
