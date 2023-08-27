import axios from 'axios';
const BASE_URL = "http://localhost:5000/api/1/user";

export const api_url = (path) => (`${BASE_URL}/${path}`)

axios.interceptors.request.use(config => {
    const jwt = document.cookie.split(";").filter(s => s.includes("access_token"))[0].split("=")[1];
    if (jwt && config.url.includes(BASE_URL))
        config.headers.Authorization = `Bearer ${jwt}`
    return config
})