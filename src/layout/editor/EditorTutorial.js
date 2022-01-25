import React from 'react';
import {
    Code, ContentSlide as C, Step, Slide as S, Presentation
} from 'react-presents';
import { ReactComponent as Logo } from '../../logo.svg';

function importAll(r) {
    const images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../resource/images/tutorial', false, /\.(png|jpe?g|svg)$/));

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
    console.log(images);
    return (
        <Presentation>
            <Slide>
                <center>
                    <h1>
                        Note-thing 101
                    </h1>
                    <p>
                        Si "Comment utiliser cette application ?" est ce que vous vous dites,
                        alors vous êtes au bon endroit !
                    </p>
                    <img src={images['thinking.png'].default} height="45%" />
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Comment créer un dossier ?
                    </h1>
                    <p>
                        Vous venez de vous créer un compte et de vous connecter à l'application.
                        Ceci est ce que vous voyez apparaître:
                    </p>
                    <img src={images['frame home.png'].default} width="60%" />
                    <p>
                        Cliquez sur le bouton "Nouveau dossier".
                    </p>
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Comment créer un dossier ?
                    </h1>
                    <p>
                        Vous devriez voir apparaître un fenêtre de dialogue vous
                        proposant d'entrer le nom du dossier.
                    </p>
                    <img src={images['frame home new folder.png'].default} width="60%" />
                    <p>
                        Pour l'example, nous allons appelez notre dossier: "Mon dossier".
                    </p>
                    <p>
                        Une fois ceci fait, cliquez sur le bounton "Créer".
                    </p>
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Comment créer un dossier ?
                    </h1>
                    <p>
                        Le dossier est maintenant créé.
                        Vous pouvez l'aperçevoir en haut à gauche de votre écran.
                    </p>
                    <img src={images['frame home new folder created.png'].default} width="60%" />
                    <p>
                        Maintenant, nous allons créer une note.
                        Cliquez sur le dossier "Mon dossier".
                    </p>
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Comment créer une note ?
                    </h1>
                    <p>
                        Dans ce menu, il vous est possible de changer le nom du dossier si souhaité.
                        Pour notre part, nous allons garder le même nom de dossier.
                    </p>
                    <img src={images['frame folder.png'].default} width="60%" />
                    <p>
                        Cliquez sur le bouton "Nouvelle note" pour créer une note.
                    </p>
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Comment créer une note ?
                    </h1>
                    <p>
                        Une fenêtre de dialogue s'est ouverte et
                        vous propose de choisir un nom pour votre note.
                    </p>
                    <img src={images['frame folder new note.png'].default} width="60%" />
                    <p>
                        Pour l'example, nous allons appelez notre note: "Ma note".
                    </p>
                    <p>
                        Une fois ceci fait, cliquez sur le bounton "Créer".
                    </p>
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Comment créer une note ?
                    </h1>
                    <p>
                        Félicitation, ous venez de créer votre première note !
                    </p>
                    <img src={images['frame folder new note created.png'].default} width="60%" />
                    <p>
                        Vous pouvez maintenant éditer votre note en utilisant le format Markdown.
                    </p>
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Comment créer une note ?
                    </h1>
                    <p>
                        Voici un example de ce qui est possible de faire avec
                        le language Markdown.
                    </p>
                    <img src={images['frame note.png'].default} width="60%" />
                    <p>
                        Maintenant vous savez comment créer une note !
                    </p>
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Félicitations !
                    </h1>
                    <p>
                        Vous avez terminé le tutoriel au complet !
                        Cliquez sur l'émoji ci-dessous pour revenir à l'application.
                    </p>
                    <a href="/">
                        <img src={images['happy.png'].default} height="45%" />
                    </a>
                </center>
            </Slide>
        </Presentation>
    );
}
