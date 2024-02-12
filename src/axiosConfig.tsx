import axios from "axios";
const instance = axios.create({
  baseURL: "https://37cc-81-180-74-152.ngrok-free.app/api/v1/",
  headers: {
    "ngrok-skip-browser-warning": "skip-browser-warning",
  },
  // withCredentials: true,
});
export default instance;
