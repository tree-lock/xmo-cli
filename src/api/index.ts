import axios from "axios";
import { axiosBaseUrl as baseURL } from "@/config";

const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(
      "%c Send API Request => " + config.url,
      "color: blue; background: #a1b345;"
    );
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
