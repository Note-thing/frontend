import ForbiddenError from '../errors/ForbiddenError';
import throwHttpError from '../errors/HttpErrorUtils';

export const CONFIG = {
    api_url: 'http://localhost:3001/api/v1',
    no_token_api_endpoints: ['/signin', '/signup', '/password/forgot', '/password/reset'],
    no_redirection_endpoints: ['/signin'],
    signin_url: '/signin',
    lost_password_url: '/lost_password',
    signup_url: '/signup',
    frontend_url: 'http://localhost:3000',
    shared_note_url: 'http://localhost:3000/shared_notes'

};

/**
 * Check if the user has the right to do an action otherwise redirect him
 * @param {String} endpoint endpoint the user is trying to reach
 * @returns True if ok, false otherwise
 */
const controlTokenBeforeRequest = (endpoint) => {
    if (!CONFIG.no_token_api_endpoints.includes(endpoint) && !localStorage.getItem('Token')) {
        window.location.replace(CONFIG.frontend_url + CONFIG.signin_url);
        return false;
    }
    return true;
};

/**
 * Check if the user is allowed to question a endpoint when an error occurs. In other words,
 * it checks if the user has received a 403 if it's the case redirect the user to the signin page
 * @param {Error} err
 * @returns true if ok, false otherwise
 */
const controlTokenAfterResponse = (endpoint, err) => {
    if (!CONFIG.no_redirection_endpoints.includes(endpoint) && err instanceof ForbiddenError) {
        window.location.replace(CONFIG.frontend_url + CONFIG.signin_url);
        return false;
    }
    return true;
};

/**
 * Construct the url with the given url, endpoint and the query params
 * @param {String} apiUrl the URL to send the request
 * @param {String} endpoint the endpoint
 * @param {Object} queryParams the query params (optional)
 * @returns {String} the buit query
 */
const buildUrl = (endpoint, queryParams) => endpoint
    + (typeof data !== 'undefined' ? '?'.concat(new URLSearchParams(queryParams)).toString() : '');

/**
 * Construct the info for the fetch, it will add the body(data) if exists
 * @param {String} method verb
 * @param {Object} data The body of the request which will be JSON.stringfy
 */
const getRequestInfoWithHeaders = (method, data) => {
    const info = {
        method,
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
            token: localStorage.getItem('Token')
        })
    };
    if (data !== null) {
        info.body = JSON.stringify(data);
    }
    return info;
};

/**
 * Fetch the data. It can throw Http exceptions or redirect if the
 * @param {String} method
 * @param {String} endpoint
 * @param {Object} data
 * @returns
 */
const requestWithBody = async (method, endpoint, data = null) => {
    if (!controlTokenBeforeRequest(endpoint)) {
        return undefined;
    }
    try {
        const res = await fetch(CONFIG.api_url + endpoint, getRequestInfoWithHeaders(method, data));
        if (!res.ok) {
            const errorJson = JSON.parse((await res.text()));
            throwHttpError(res.status, errorJson.message, errorJson);
        } else if (res.status === 204) {
            return undefined;
        }
        const response = await res.json();

        return response;
    } catch (err) {
        // ControlTokenAfterResponse will redirect if 403. It will return true otherwise
        // if it returns true throw the error again
        if (controlTokenAfterResponse(endpoint, err)) {
            throw err;
        }
    }
    return undefined;
};

export const Get = async (endpoint, data) => requestWithBody('GET', buildUrl(endpoint, data));

/**
 * Post request.
 * @param {String} endpoint the endpoint to reach
 * @param {Object} data the body data
 * @returns Response
 */
export const Post = (endpoint, data) => requestWithBody('POST', endpoint, data);

/**
 * Patch request.
 * @param {String} endpoint the endpoint to reach
 * @param {Object} data the body data
 * @returns Response
 */
export const Patch = (endpoint, data) => requestWithBody('PATCH', endpoint, data);

/**
 * Delete request.
 * @param {String} endpoint the endpoint to reach
 * @param {Object} data the body data
 * @returns Response
 */
export const Delete = (endpoint, data) => requestWithBody('DELETE', endpoint, data);
