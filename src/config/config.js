export const CONFIG = {
    api_url: 'http://localhost:3001',
    signin_url: '/signin',
    lost_password_url: '/lost_password',
    signup_url: '/signup'
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
                credentials: 'include'
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
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString()
        }).then((response) => response.json());
    } catch (err) {
        console.error(err);
    }
};
