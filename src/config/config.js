export const CONFIG = {
    api_url: 'http://localhost:3001/api/v1',
    signin_url: '/signin',
    lost_password_url: '/lost_password',
    signup_url: '/signup',
    user_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NDAzNDEwMTh9.u-czzX3Kihkj1aVF2u9EQhw67bZBt6E6FP5pSRBKnqA'
};

export const Get = async (endpoint, data) => {
    try {
        return await fetch(
            CONFIG.api_url
                + endpoint
                + (typeof data !== 'undefined'
                    ? '?'.concat(new URLSearchParams(data)).toString()
                    : ''),
            {
                method: 'GET',
                headers: {
                    token: CONFIG.user_token
                }
            }
        ).then((response) => response.json());
    } catch (err) {
        console.error(err);
    }
};

export const Post = async (endpoint, data) => {
    try {
        return await fetch(CONFIG.api_url + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: CONFIG.user_token
            },
            body: JSON.stringify(data)
        }).then((response) => response.json());
    } catch (err) {
        console.error(err);
    }
};

export const Delete = async (endpoint, data) => {
    try {
        return await fetch(CONFIG.api_url + endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                token: CONFIG.user_token
            },
            body: JSON.stringify(data)
        }).then((response) => response.json());
    } catch (err) {
        console.error(err);
    }
};
