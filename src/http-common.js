import axios from "axios";

export default axios.create({
  baseURL: "http://sgacfi-back-mern.up.railway.app/sgacfi-api",
  // baseURL: "http://localhost:4000/sgacfi-api",
  headers: {
    "Content-type": "application/json",
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWMzMGRkNjRlZjlkYjE4NTc1MjllYiIsImlhdCI6MTY4Mzc2MzQyMSwiZXhwIjoxNjg0MzY4MjIxfQ.4oL0zrK17rWluOIN0aCmyFbmg7YastUsPPKYZ6v2vHE",
  },
});
