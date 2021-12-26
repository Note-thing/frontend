import topbar from 'topbar';
import throwHttpError from '../errors/HttpErrorUtils';

export const CONFIG = {
    api_url: 'http://localhost:3001/api/v1',
    signin_url: '/signin',
    lost_password_url: '/lost_password',
    signup_url: '/signup',
    frontend_url: 'http://localhost:3000/',
    shared_note_url: 'http://localhost:3000/shared_notes/'
};
const handleError = (response) => {
    if (!(response.status >= 200 && response.status < 400)) {
        throwHttpError(response.status, 'Erreur http');
    }
};
const requestWithBody = async (method, endpoint, data) => {
    try {
        const response = await fetch(CONFIG.api_url + endpoint, {
            method,
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString()
        });
        handleError(response);

        return response.json();
    } catch (err) {
        throw err;
    }
};

export const Get = async (endpoint, data) => {
    try {
        const response = await fetch(
            CONFIG.api_url +
                endpoint +
                (typeof data !== 'undefined'
                    ? '?'.concat(new URLSearchParams(data)).toString()
                    : ''),
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        handleError(response);

        return response.json();
    } catch (err) {
        throw err;
    }
};

export const Post = (endpoint, data) => requestWithBody('POST', endpoint, data);
export const Delete = (endpoint, data) => requestWithBody('DELETE', endpoint, data);
