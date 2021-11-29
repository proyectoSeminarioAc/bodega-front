import axios from "axios";

export function exportHttpClient() {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL||'http://ec2-3-19-72-67.us-east-2.compute.amazonaws.com:8080/api/project_store',
        timeout: 10000,
    });
}
