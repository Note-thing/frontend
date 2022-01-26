import React from 'react';
import { InsertEmoticon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../logo.svg';

/**
 * Welcome message to users when juste logged in
 * @returns
 */
export default function WelcomeComponent() {
    return (
        <div className="welcome">
            <center>
                <Logo />
                <h1>Bienvenue sur Note-thing</h1>
                <p>
                    Vous pouvez créer une nouvelle note ou un nouveau dossier
                    dès maintenant en utilisant le menu à gauche.
                </p>
                <h3>Vous souhaitez un tutoriel plus détailé ?</h3>
                <p>
                    Pas de soucis, vous pouvez accèder à un tutoriel plus détailé
                    en appuyant sur votre profil, puis sur "Tutoriel" ou en cliquant
                    l'emoji suivant:&nbsp;
                    <Link to="/tutorial"><InsertEmoticon /></Link>
                </p>
            </center>
        </div>
    );
}
