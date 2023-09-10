import axios from 'axios';
const BASE_URL = "https://budget-buddy-dx0b.onrender.com/api/1/user";

export const api_url = (path) => (`${BASE_URL}/${path}`)
export const params = {
    headers: { 'Content-Type': 'application/json' }
};

axios.interceptors.request.use(config => {
    const jwt = document.cookie.split(";").filter(s => s.includes("access_token"))[0].split("=")[1];
    if (jwt && config.url.includes(BASE_URL))
        config.headers.Authorization = `Bearer ${jwt}`
    return config
})