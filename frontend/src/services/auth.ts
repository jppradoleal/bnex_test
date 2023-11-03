import { Axios } from "axios";
import { UserData } from "../components/LoginForm";
import { api } from "./api";

interface ILoginResponse {
  token: string;
}

class AuthService {
  api: Axios;

  constructor(api: Axios) {
    this.api = api;
  }

  async create(data: UserData) {
    return await this.api.post("/users/", data);
  }

  async login(data: UserData) {
    return await this.api.post<ILoginResponse>("/login/", data);
  }
}

const authService = new AuthService(api);

export default authService;
