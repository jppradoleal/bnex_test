import Axios from "axios";

const api = Axios.create({
  baseURL: import.meta.env.VITE_API_ADDRESS,
});

export { api };
