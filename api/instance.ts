import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3000/api/`,
  timeout: 8000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsaWVudDEiLCJ1c2VyVHlwZSI6ImNsaWVudCIsImlhdCI6MTY4NTg3NTUzNiwiZXhwIjoxNzE3NDExNTM2LCJpc3MiOiJldmVyeS13ZWFyIn0.AbLiuNmHe6stF2zpPmccy6tc54PMXeEKuRpie3x_NOU",
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
