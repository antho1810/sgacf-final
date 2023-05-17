import axios from 'axios'

const token = localStorage.getItem('token')

console.log(token)

export default axios.create({
    baseURL: "https://sgacfi-back-mern.up.railway.app/sgacfi-api",
    headers: {
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjQyMjkwMjAxMWY1NGI2YjliN2IxYSIsImlhdCI6MTY4NDI4NDA0OCwiZXhwIjoxNjg0ODg4ODQ4fQ.4DVSvi4sVHneQOlXJ-ledypR1K4mWPei0af8aODxmh8"
    }
})