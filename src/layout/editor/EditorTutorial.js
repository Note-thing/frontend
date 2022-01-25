import React from 'react';
import {
    Button, IconButton
} from '@mui/material';
import {
    Code, ContentSlide as C, Step, Slide as S, Presentation
} from 'react-presents';
import { ReactComponent as Logo } from '../../logo.svg';
import { ReactComponent as CodeIcon } from '../../resource/icons/editor-viewmode-code.svg';
import { ReactComponent as ViewIcon } from '../../resource/icons/editor-viewmode-view.svg';
import { ReactComponent as SplitIcon } from '../../resource/icons/editor-viewmode-split.svg';
import { 
    Share as ShareIcon,
    Delete as DeleteIcon,
    PictureAsPdf as PictureAsPdfIcon,
    LockOpen as LockOpenIcon,
    Lock as LockIcon,
    Sync as SyncIcon
 } from '@mui/icons-material';

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
                        Prise en main de l'interface
                    </h1>
                    <p>
                        Les bouttons suivants permettent d'ajuster comment Vous
                        souahitez affichez votre note:
                    </p>
                </center>
                <ul>
                    <li>
                        <Button size="small">
                            <CodeIcon />
                        </Button>
                        &nbsp;Affiche uniquement l'éditeur Markdown
                    </li>
                    <li>
                        <Button size="small">
                            <SplitIcon />
                        </Button>
                        &nbsp;Affiche l'éditeur Markdown et le rendus HTML (option par défaut)
                    </li>
                    <li>
                        <Button size="small">
                            <ViewIcon />
                        </Button>
                        &nbsp;Affiche uniquement le rendus HTML
                    </li>
                </ul>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Prise en main de l'interface
                    </h1>
                    <p>
                        Les bouttons suivants permettent d'effectuer
                        une action sur la note ouverte:
                    </p>
                </center>
                <ul>
                    <li>
                        <IconButton
                            color="primary"
                        >
                            <ShareIcon />
                        </IconButton>
                        &nbsp;Permets de partager notre note
                    </li>
                    <li>
                        <IconButton
                            color="primary"
                        >
                            <PictureAsPdfIcon />
                        </IconButton>
                        &nbsp;Permets de télécharger le rendus HTMl en un fichier PDF
                    </li>
                    <li>
                        <IconButton
                            color="primary"
                        >
                            <DeleteIcon />
                        </IconButton>
                        &nbsp;Permets de supprimer la note
                    </li>
                </ul>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Prise en main de l'interface
                    </h1>
                    <p>
                        Lorsque vous cliquez sur le bouton&nbsp;
                        <IconButton
                            color="primary"
                        >
                            <ShareIcon />
                        </IconButton>
                        &nbsp;pour partager votre note, il vous sera offert trois options:
                    </p>
                </center>
                <ul>
                    <li>
                        <b>Copie de note</b>
                        &nbsp;Offre la possibilité à quiconque possèdant le lien
                        de créer une copie de votre note.
                    </li>
                    <li>
                        <b>Lecture seule</b>
                        &nbsp;Offre la possibilité à quiconque possèdant le lien
                        de voir votre note sans pouvoir l'éditer.
                    </li>
                    <li>
                        <b>Note partagée</b>
                        &nbsp;Offre la possibilité à quiconque possèdant le lien
                        de voir et modifier votre note. (seulement une personne à la fois)
                    </li>
                </ul>
                <center>
                    <p>
                        Une fois le type de partage choisis, cliquez sur le bouton
                        "Générer un lien". Vous pouvez ensuite copier et partager ce lien
                        avec qui vous voulez.
                    </p>
                </center>
            </Slide>
            <Slide>
                <center>
                    <h1>
                        Prise en main de l'interface
                    </h1>
                    <p>
                        Le boutton suivant apparaît pour toutes les notes partagées en mode
                        "Lecture seule" et "Note partagée":
                    </p>
                </center>
                <ul>
                    <li>
                        <IconButton
                            color="primary"
                        >
                            <SyncIcon />
                        </IconButton>
                        &nbsp;Permets de récupérer la version la plus récente de la note partagée.
                    </li>
                </ul>
                <center>
                    <p>
                        Le boutton suivant apparaît pour toutes les notes partagées en mode
                        "Lecture seule" et "Note partagée":
                    </p>
                </center>
                <ul>
                    <li>
                        <IconButton
                            color="primary"
                        >
                            <LockOpenIcon />
                        </IconButton>
                        &nbsp;Permets de déverouiller la note pour laisser un autre utilisateur
                        faire de modifications.
                    </li>
                    <li>
                        <IconButton
                            color="primary"
                        >
                            <LockIcon />
                        </IconButton>
                        &nbsp;Permets de demander le vérouillage de la note pour pouvoir l'éditer.
                    </li>
                </ul>
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
