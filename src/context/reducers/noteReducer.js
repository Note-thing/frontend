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
export default reducer;