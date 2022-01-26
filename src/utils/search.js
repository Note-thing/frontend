/**
 * Add or merge the result of a search. It add +1 to the score of the note
 * everytime the note match a term
 * @param {Map<Number, Object>} result a map which the id is the id of a note
 * and the object is the score and the note
 * @param {Object} note the note to add or update into the result
 */
const addOrMergeResult = (result, note) => {
    if (result.has(note.id)) {
        const oldResult = result.get(note.id);
        result.set(note.id, { note, score: oldResult.score + 1 });
    } else {
        result.set(note.id, { note, score: 1 });
    }
};

/**
 * Return the given term in lower case and without accent
 * @param {String} term a word
 * @returns {String} The term in lower case and without accent
 */
const sanitze = (term) => term
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/**
 * Search the result
 * @param {Object} notes
 * @param {String} request search request
 * @returns Map<Number, Object> return the result as a map with the id as key and an object which
 * contains the note and a score for the note (everytime a note match a term of the request its
 * score is increase of 1)
 */
export default (notes, request) => {
    const result = new Map();
    const sanitizedRequest = sanitze(request);
    if (sanitizedRequest === '') {
        return result;
    }
    const requestTerms = sanitze(request).split(' ');

    notes.directories.forEach((dir) => {
        dir.notes.forEach((note) => {
            requestTerms.forEach((term) => {
                if (sanitze(note.title).includes(term)) {
                    addOrMergeResult(result, note);
                }
                // Join the tags to search easier way
                if (sanitze(note.tags.map((tag) => tag.title).join(' ')).includes(term)) {
                    addOrMergeResult(result, note);
                }
            });
        });
    });
    return result;
};
