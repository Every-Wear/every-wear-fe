import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3000/api/`,
  timeout: 8000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsaWVudDQiLCJ1c2VyVHlwZSI6ImNsaWVudCIsImlhdCI6MTY4NTg1NTEyMCwiZXhwIjoxNzE3MzkxMTIwLCJpc3MiOiJldmVyeS13ZWFyIn0.3c6vwvOh5nEhAgWmi8TNoGa6oYQvFXzYsLbV4ipJPd8",
  },
});

// axios response interceptors
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return err;
  },
);

export { instance };
