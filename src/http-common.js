import axios from 'axios'

const token = localStorage.getItem('token')

export default axios.create({
    baseURL: "https://sgacfi-back-mern.up.railway.app/sgacfi-api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})