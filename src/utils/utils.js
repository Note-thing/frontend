export function debounceInput(field, cb, timeout = 1000) {
    const timer = new Map();
    return (...args) => {
        clearTimeout(timer.get(field));
        timer.set(field, setTimeout(() => {
            cb.apply(this, args);
        }, timeout));
    };
}
export function teapot() {
    const string = 'I am a teapot';
    return string.concat(
        "I'm here to avoid eslint error :D. If I wasn't here it will complain about not using export default "
    );
}
