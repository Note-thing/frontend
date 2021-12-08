import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Get } from '../../config/config';

export default function SharedNoteComponent() {
    const [isCopying, setIsCopying] = useState(false);
    useEffect(() => {
        const copyNote = async () => {
            setIsCopying(true);
            const { uuid } = useParams();
            const note = await Get(`/shared_notes/copy/${uuid}`);
            // TODO call context note pour ajouter la note
            setIsCopying(false);
        };
        copyNote();
    }, []);

    return (
        <div>

            <h1>
                Copie d\'une nouvelle note
            </h1>
            <p>
                Copie de la note dans votre espace.

                {isCopying && <CircularProgress />}
            </p>
        </div>
    );
}
