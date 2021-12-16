import React, { useEffect, createContext, useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'change_directory':
            return {
                ...state,
                directory: {
                    ...state.directory,
                    ...action.directory
                }
            };
        case 'change_note':
            return {
                ...state,
                note: { ...action.note }
            };
        default:
            return state;
    }
};

export const NoteContext = createContext();

const data = {
    directory: { },
    note: { },
    directories: [{
        uniqid: '619f6488babbf',
        name: 'TWEB',
        notes: [
            {
                uniqid: 'dfgh3245sdfg',
                title: 'CSS',
                tags: ['Web', 'design'],
                content: `# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).              
NPM installs
\`\`\`javascript
npm install topbar --save
npm install react-html-parser
\`\`\`
## Available Scripts
In the project directory, you can run:
### \`npm start\`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### \`npm test\`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### \`npm run build\`

Builds the app for production to the \`build\` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### \`npm run eject\`

**Note: this is a one-way operation. Once you \`eject\`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can \`eject\` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except \`eject\` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use \`eject\`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### \`npm run build\` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
`
            },
            { uniqid: 'awei546fcguuz', title: 'JS', tags: ['JS', 'prototype'] },
            { uniqid: '345jfhtzdffvret', title: 'Node', tags: ['JS', 'SSR'] }
        ]
    },
    {
        uniqid: '61ddfgg488babbf',
        name: 'PDG',
        notes: [
            { uniqid: 'dfg456fgh456', title: 'Note-thing', tags: ['Web', 'design'] },
            { uniqid: 'fghfgh345nb', title: 'Ruby on Rails', tags: ['Model', 'Controller'] },
            { uniqid: 'etz4256dsfh', title: 'CI/CD', tags: ['Jest.js', 'Unit test'] }
        ]
    },
    {
        uniqid: '4566fgg488babbf',
        name: 'AMT',
        notes: [
            { uniqid: '789dfg234dfg', title: 'Guide de survie total', tags: ['Spring'] },
            { uniqid: '456gzuwesdgf', title: 'Survire en haute mer', tags: ['Spring', 'MVC'] },
            {
                uniqid: 'uilert3452dfg',
                title: 'Apprendre à utiliser une boussole',
                tags: ['Navigation']
            }
        ]
    }]
};

const getActiveFromURL = (directories) => {
    const [, , directoryId, , noteId] = window.location.pathname.split('/');
    const directory = directories.find((d) => d.uniqid === directoryId);
    const note = directory && directory.notes.find((n) => n.uniqid === noteId);
    return {
        directory,
        note
    };
};

export const NoteProvider = (props) => {
    const [notes, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        const active = getActiveFromURL(notes.directories);
        if (active.directory) {
            dispatch({
                type: 'change_directory',
                directory: active.directory
            });
        }
        if (active.note) {
            dispatch({
                type: 'change_note',
                note: active.note
            });
        }
    }, [dispatch]);

    return (
        <NoteContext.Provider value={{ notes, dispatch }}>
            { props.children }
        </NoteContext.Provider>
    );
};
