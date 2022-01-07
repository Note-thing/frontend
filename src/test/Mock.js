const storeValues = new Map();
storeValues.set('Token', 'JWT');
export const mockStorage = {
    value: {
        setItem(key, value) {
            storeValues.set(key, value);
        },
        getItem(key) {
            return storeValues.get(key);
        }
    }
};

export const teapot = "I'm here to avoid eslint error";
