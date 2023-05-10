import axios, { AxiosInstance } from "axios";
import { HOST } from "./env/HOST";
import { IRegister, ILogIn } from "@/interfaces/accounts"; // 추가한 import 문

const API: AxiosInstance = axios.create({
  baseURL: `${HOST}/accounts`,
  //   baseURL: `127.0.0.1:8000/accounts`,
});

export const register = async (userData: IRegister): Promise<void> => {
  await API.post("/register/", userData);
};

export const login = async (
  userData: ILogIn
): Promise<{ nickname: string }> => {
  const response = await API.post("/login/", userData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await API.post("/logout/");
};
