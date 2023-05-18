import axios from "axios"

export default axios.create({
  baseURL: "https://sgacfi-back-mern.up.railway.app/sgacfi-api/",
  // baseURL: "http://localhost:4000/sgacfi-api",
  headers: {
    "Content-type": "application/json",
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjY2ZjRiMGM5NDY2YzNmZTdmODdhYyIsImlhdCI6MTY4NDQzNDc2NCwiZXhwIjoxNjg1MDM5NTY0fQ.xSTLtRQ4PB6eOLbn9vHgHbh1iwgJVL_BtngPu8auEgU",
  },
});
