import axios from 'axios'


axios.defaults.baseURL = "http://localhost:3006/"
export default function Api(url, method, data) {
    return Promise((resolve, reject) => {
        axios.interceptors.request
    })
}