import DEFAULT_MOCK_DATA from '../../test/data';
import search from '../../utils/search';

describe('Search function', () => {
    it('space shouldnt return anything', () => {
        expect(search(DEFAULT_MOCK_DATA, ' ').size).toBe(0);
    });
    it('Search a letter present in every notes', () => {
        expect(search(DEFAULT_MOCK_DATA, 't').size).toBe(2);
    });
    it('Search a tag', () => {
        expect(search(DEFAULT_MOCK_DATA, 'inf').size).toBe(1);
    });
    it('Search a tag in capital letters', () => {
        expect(search(DEFAULT_MOCK_DATA, 'INF').size).toBe(1);
    });
    it('Search a name in capital letters', () => {
        expect(search(DEFAULT_MOCK_DATA, 'secondhand4545').size).toBe(1);
    });
    it('Middle word', () => {
        expect(search(DEFAULT_MOCK_DATA, 'dhand').size).toBe(1);
    });
    it('Better score', () => {
        expect(search(DEFAULT_MOCK_DATA, 'secondhand4545 test1').get(5).score).toBe(2);
    });
    it('Sanitze accent', () => {
        expect(search(DEFAULT_MOCK_DATA, 'éééééé').has(3)).toBe(true);
    });
    it('No result', () => {
        expect(search(DEFAULT_MOCK_DATA, 'alsjdkflkasdjflkjasdf').size).toBe(0);
    });
    it('a good term and a bad term (alsjdkflk INF => return note with tag INF)', () => {
        expect(search(DEFAULT_MOCK_DATA, 'alsjdkflk INF').size).toBe(1);
    });
});
