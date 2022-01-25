export const SHARED_NOTE_TYPE = {
    COPIED: {
        key: 'copy_content',
        display: 'Copie de note',
        description:
            'Permet de faire une copie de la note partagée'
            + ' à un certain moment. Les 2 versions restent indépendantes'
    },
    READY_ONLY: {
        key: 'read_only',
        display: 'Lecture seule',
        description: 'Permet de laisser '
    },
    MIRROR: {
        key: 'mirror',
        display: 'Note partagée ',
        description:
            'Permet de collaborer sur une note avec un système de verou. La note est copié mais '
            + ' les 2 versions sont synchronisé tant que la note original existe.'
            + ' Si cette dernière est supprimée la note copiée devient indépendante.'
            + ' Lorsqu\'un des utilisateurs édite la note elle est verrouillée pour les autres utilisateurs'
    }
};
export const SHARED_NOTE_DEFAULT_TYPE = SHARED_NOTE_TYPE.COPIED;
