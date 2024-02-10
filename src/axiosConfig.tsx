import axios from 'axios';
const instance = axios.create({
baseURL: "https://5fb6-81-180-74-153.ngrok-free.app/api/v1/",
headers: {
    'ngrok-skip-browser-warning': 'skip-browser-warning',
  },
// withCredentials: true,
});
export default instance;