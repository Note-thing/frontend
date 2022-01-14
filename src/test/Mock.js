/**
 * Mock localstorage with fake user.
 * @returns
 */
export const mockStorage = () => {
    const storeValues = new Map();
    storeValues.set('User', '{"email":"note-thing@pm.me","isAuthenticated":true}');
    storeValues.set('Token', 'éo234h5élk34hn5ékh35é23h5li23h45liu32h5i3h5ii2l34h5hl2i45');
    return {
        value: {
            setItem(key, value) {
                storeValues.set(key, value);
            },
            getItem(key) {
                return storeValues.get(key);
            },
            clear() {
                storeValues.clear();
            }
        }
    };
};
export const teapot = 'test';
