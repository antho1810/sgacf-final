import axios from "axios";

export default axios.create({
  baseURL: "http://sgacfi-back-mern.up.railway.app/sgacfi-api",
  // baseURL: "http://localhost:4000/sgacfi-api",
  headers: {
    "Content-type": "application/json",
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWVkNDA3MjYyODNlNjA5Y2Q0ODY0NyIsImlhdCI6MTY4MzkzNjI2MywiZXhwIjoxNjg0NTQxMDYzfQ.PSTKC_njzbn9KwI9eXuni9RKzSTndZGf8c8pw_PNeQ0",
  },
});
