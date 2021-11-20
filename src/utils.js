import axios from "axios";

export function exportHttpClient() {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 1000,
    });
}
