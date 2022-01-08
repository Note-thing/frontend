export const validateLength = (val) => val.length > 3;
export const validateName = (val) => validateLength(val) && /[^0-9`!@#%&*+_=]+/.test(String(val).toLowerCase());
// eslint-disable-next-line no-useless-escape
export const validateEmail = (email) => validateLength(email) && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
export const validatePassword = (pwd) => pwd.length >= 6;
