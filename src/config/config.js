import topbar from 'topbar';

export const CONFIG = {
    api_url: 'http://localhost:3001/api/v1',
    signin_url: '/signin',
    lost_password_url: '/lost_password',
    signup_url: '/signup',
    frontend_url: 'http://localhost:3000/shared_notes/',
    shared_note_url: 'http://localhost:3000/shared_notes/'
};

const requestWithBody = async (method, endpoint, data) => {
    topbar.show();
    try {
        const response = await fetch(CONFIG.api_url + endpoint, {
            method,
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString()
        });
        topbar.hide();
        return response.json();
    } catch (err) {
        topbar.hide();
    }
    return undefined;
};

export const Get = async (endpoint, data) => {
    topbar.show();
    try {
        const response = await fetch(
            CONFIG.api_url
            + endpoint
            + (typeof data !== 'undefined'
                ? '?'.concat(new URLSearchParams(data)).toString()
                : ''),
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        topbar.hide();
        return response.json();
    } catch (err) {
        topbar.hide();
    }
    return undefined;
};

export const Post = (endpoint, data) => requestWithBody('POST', endpoint, data);
export const Delete = (endpoint, data) => requestWithBody('DELETE', endpoint, data);
