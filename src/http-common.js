import axios from 'axios'

const token = localStorage.getItem('token')

console.log(token)

export default axios.create({
    baseURL: "https://sgacfi-back-mern.up.railway.app/sgacfi-api",
    headers: {
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc2MzkzZDk4MDE5NzAyNTk0ZjkxYTciLCJub21icmUiOiJFZG5hIiwiYXBlbGxpZG8iOiJDb25kZSIsImNhcmdvIjoiU2VjcmV0YXJpYSIsInJvbCI6W10sImlhdCI6MTY4NTQ2OTUwMSwiZXhwIjoxNjg2MDc0MzAxfQ._y-H8G9sc6ZVu9NS_tuUCW9ChtDZridhdRepe_rIMAk"
    }
})
