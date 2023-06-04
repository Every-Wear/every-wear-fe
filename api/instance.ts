import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3000/api/`,
  timeout: 8000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNlcnZlcjEiLCJ1c2VyVHlwZSI6InNlcnZlciIsImlhdCI6MTY4NTg2ODUzMSwiZXhwIjoxNzE3NDA0NTMxLCJpc3MiOiJldmVyeS13ZWFyIn0.TBX7YA5oSLVsRBdbtBaER7w1cj_-nx993UfWGzrlLqw",
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
