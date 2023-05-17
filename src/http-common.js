import axios from "axios"

export default axios.create({
  baseURL: "https://sgacfi-back-mern.up.railway.app/sgacfi-api/",
  // baseURL: "http://localhost:4000/sgacfi-api",
  headers: {
    "Content-type": "application/json",
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjQyMjkwMjAxMWY1NGI2YjliN2IxYSIsImlhdCI6MTY4NDI4NDA0OCwiZXhwIjoxNjg0ODg4ODQ4fQ.4DVSvi4sVHneQOlXJ-ledypR1K4mWPei0af8aODxmh8",
  },
});
