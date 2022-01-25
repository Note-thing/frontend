import React from 'react';
import {
    ContentSlide as C, Step, Slide as S, Presentation
} from 'react-presents';
import { ReactComponent as Logo } from '../../logo.svg';

const Slide = ({ children }) => (
    <S
        component={() => (
            <>
                <C className="slide-content">
                    <center>
                        <Logo />
                    </center>
                    <div>{children}</div>
                </C>
            </>
        )}
    />
);

/**
 * Tutorial for the app.
 * @returns
 */
export default function EditorTutorial() {
    return (
        <Presentation>
            <Slide>
                <center>
                    <h1>
                        Note-thing 101
                    </h1>
                    Si "Comment utiliser cette application ?" est ce que vous vous dites,
                    alors vous êtes au bon endroit !
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Votre première connexion à Note-thing
                    </h1>
                    Vous venez de vous créer un compte et de vous y connecter.
                    Ceci est ce que vous voyez apparaître:
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Note-thing 101
                    </h1>
                    Si "Comment utiliser cette application ?" est ce que vous vous dites,
                    vous êtes au bon endroit !
                </center>
            </Slide>
        </Presentation>
    );
}
