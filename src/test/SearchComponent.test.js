import React from 'react';
import {
    render, fireEvent, screen
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoteContext } from '../context/NoteContext';
import MOCK_DATA from './data';
import { MainContext } from '../context/MainContext';
import { mockStorage } from './Mock';
import SearchComponent from '../layout/search/SearchComponent';

Object.defineProperty(window, 'options', { offset: 210 });
Object.defineProperty(window, 'localStorage', mockStorage());
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'localhost:3000/directory/1'
    }),
    useHistory: () => ({
        push: (where) => `localhost:3000${where}`
    })
}));
// Mock useParams used in SharedNoteComponent

const notes = MOCK_DATA;
const dispatch = jest.fn();

beforeEach(() => {
    document.body.innerHTML = '';
    render(
        <MainContext.Provider
            value={{
                main: {
                    user: {
                        firstname: 'Stefan',
                        lastname: 'Teofanovic',
                        email: 'st@novic.ch',
                        isAuthenticated: true
                    }
                },
                dialog: null
            }}
        >
            <NoteContext.Provider value={{ notes, dispatch }}>
                <SearchComponent />
            </NoteContext.Provider>
        </MainContext.Provider>
    );
});

it('Search component - search for two first letters of the title of a note should return corresponding note', async () => {
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'se' }
    });
    expect(screen.getByText(notes.directories[0].notes[0].title)).toBeInTheDocument();
    expect(screen.getByText('Recherche: 1 résultat(s) trouvé(s)')).toBeInTheDocument();
});

it('Search component - search for last letters of the title of a note should return corresponding note', async () => {
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'nda' }
    });
    expect(screen.getByText(notes.directories[1].notes[0].title)).toBeInTheDocument();
    expect(screen.getByText('Recherche: 1 résultat(s) trouvé(s)')).toBeInTheDocument();
});

it('Search component - search for middle letters of the title of a note should return corresponding note', async () => {
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'age' }
    });
    expect(screen.getByText(notes.directories[1].notes[0].title)).toBeInTheDocument();
    expect(screen.getByText('Recherche: 1 résultat(s) trouvé(s)')).toBeInTheDocument();
});

it('Search component - search by tags one result', async () => {
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'test1' }
    });
    expect(screen.getByText(notes.directories[0].notes[0].title)).toBeInTheDocument();
    expect(screen.getByText('Recherche: 1 résultat(s) trouvé(s)')).toBeInTheDocument();
});
it('Search component - Tags multiple results', async () => {
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'test' }
    });
    expect(screen.getByText(notes.directories[1].notes[0].title)).toBeInTheDocument();
    expect(screen.getByText('Recherche: 2 résultat(s) trouvé(s)')).toBeInTheDocument();
});
it('Search component - title + tag', async () => {
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'test secon' }
    });
    expect(screen.getByText(notes.directories[1].notes[0].title)).toBeInTheDocument();
    expect(screen.getByText('Recherche: 2 résultat(s) trouvé(s)')).toBeInTheDocument();
});
it('Search component - click on result should close result', async () => {
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'test secon' }
    });
    expect(screen.getByText(notes.directories[1].notes[0].title)).toBeInTheDocument();
    fireEvent.click(screen.getByText(notes.directories[1].notes[0].title));
    expect(screen.queryByTestId('search-result-list')).not.toBeInTheDocument();
});
it('Search component - Search component - should show not result when...no result', async () => {
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'xxxxxyyyyy' }
    });
    expect(screen.getByText('Aucun résultat')).toBeInTheDocument();
});
it('Search component - accent should be ignored (transformed to normal letter é -> e)', async () => {
    // check accent in request
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'tést' }
    });
    expect(screen.getByText('Recherche: 2 résultat(s) trouvé(s)')).toBeInTheDocument();
    //
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'eeee' }
    });
    expect(screen.getByText('Recherche: 1 résultat(s) trouvé(s)')).toBeInTheDocument();
});
it('Search component - no case sensivity', async () => {
    // check accent in request
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'Test' }
    });
    expect(screen.getByText('Recherche: 2 résultat(s) trouvé(s)')).toBeInTheDocument();
    // check capital letter in notes
    fireEvent.change(screen.getByTestId('search-input').querySelector('input'), {
        target: { value: 'inf1' }
    });
    expect(screen.getByText('Recherche: 1 résultat(s) trouvé(s)')).toBeInTheDocument();
});
