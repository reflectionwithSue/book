import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use((request) => {
  if (!request.headers["Content-Type"]) {
    request.headers["Content-Type"] = "application/json";
  }

  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axios;
