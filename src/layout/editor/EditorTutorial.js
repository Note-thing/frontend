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
                    <Logo />
                    <h1>
                        Note-thing 101
                    </h1>
                    Si "Comment utiliser cette application ?" est ce que vous vous dites,
                    vous êtes au bon endroit !
                </center>
            </Slide>
            <Slide>
                <center>
                    <Logo />
                    <h1>
                        Note-thing 101
                    </h1>
                    Si "Comment utiliser cette application ?" est ce que vous vous dites,
                    vous êtes au bon endroit !
                </center>
            </Slide>
            <Slide>
                <center>
                    <Logo />
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
