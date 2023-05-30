import axios from 'axios'

const token = localStorage.getItem('token')

console.log(token)

// export default axios.create({
//     baseURL: "https://sgacfi-back-mern.up.railway.app/sgacfi-api",
//        headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//     }
// })

export default axios.create({
    baseURL: "https://sgacfi-back-mern.up.railway.app/sgacfi-api",
    headers: {
        "Content-Type": "application/json",
//         "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjZiMmI1MTE0NzQ3ZjFlZjBmMzlkMSIsImlhdCI6MTY4NDQ1MjAyMSwiZXhwIjoxNjg1MDU2ODIxfQ.tzQlsZfeunGYl9U2QGncCCQpmLKSpyMC1OIpWkFDAkA"
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzQ5ZWQ4YjZmNjQwNDE4MDZmZTA3ZiIsImlhdCI6MTY4NTM2NDQ0MCwiZXhwIjoxNjg1OTY5MjQwfQ.tQgt8RGGNOKODeEzjym69XTpcWKq7ZNTIegsUPIWoOU"
    }
})
