import axios from 'axios'

const token = localStorage.getItem('token')

export default axios.create({
    // baseURL: "http://localhost:4000/api/",
    baseURL: "https://sgacfi-back-mern-api.up.railway.app/sgacfi-api/",
    // baseURL: "https://api-z5zl.onrender.com/sgacfi-api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})