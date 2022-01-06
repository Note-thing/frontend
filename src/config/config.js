import throwHttpError from '../errors/HttpErrorUtils';

export const CONFIG = {
    api_url: 'http://localhost:3001/api/v1',
    no_token_api_endpoints: ['/signin'],
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

const controlTokenBeforeRequest = (endpoint) => {
    if (!CONFIG.no_token_api_endpoints.includes(endpoint) && !localStorage.getItem('Token')) {
        window.location.replace(CONFIG.frontend_url + CONFIG.signin_url);
        return false;
    }
    return true;
};

const controlTokenAfterResponse = (response) => {
    if (response.status === 403) {
        window.location.replace(CONFIG.frontend_url + CONFIG.signin_url);
    }
};

const requestWithBody = async (method, endpoint, data) => {
    if (!controlTokenBeforeRequest(endpoint)) {
        return;
    }
    const response = await fetch(CONFIG.api_url + endpoint, {
        method,
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
            token: localStorage.getItem('Token')
        }),
        body: JSON.stringify(data)
    }).catch((error) => {
        throwHttpError(error, 'Erreur http');
    });
    controlTokenAfterResponse(response);
    handleError(response);

    return response.json();
};

export const Get = async (endpoint, data) => {
    if (!controlTokenBeforeRequest(endpoint)) {
        return;
    }
    const response = await fetch(
        CONFIG.api_url
                + endpoint
                + (typeof data !== 'undefined'
                    ? '?'.concat(new URLSearchParams(data)).toString()
                    : ''),
        {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                token: localStorage.getItem('Token')
            })
        }
    ).catch((error) => {
        throwHttpError(error, 'Erreur http');
    });
    controlTokenAfterResponse(response);

    handleError(response);
    const json = await response.json();
    return json;
};

export const Post = (endpoint, data) => requestWithBody('POST', endpoint, data);
export const Patch = (endpoint, data) => requestWithBody('PATCH', endpoint, data);
export const Delete = (endpoint, data) => requestWithBody('DELETE', endpoint, data);
