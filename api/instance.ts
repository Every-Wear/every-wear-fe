import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3000/api/`,
  timeout: 8000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
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
