
export const CONFIG = { 
    api_url : "http://localhost:3001",
    signin_url : "/signin",
    lost_password_url : "/lost_password",
    signup_url : "/signup",
}

export const Get = async (url) => {
    try{
        return await fetch(url, {
            method: 'GET',
            credentials: 'include' 
        });
    }catch(err){
        console.error(err);
    }
}

export const Post = async (url, data) => {
    try{
        return await fetch(url,  {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString()
        });
    }catch(err){
        console.error(err);
    }
}