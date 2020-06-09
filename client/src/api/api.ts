import axios, { AxiosResponse } from "axios";
import { ApiConfig } from "../config/api.config";
import { ApiResponseType } from "../types/dto/ApiResponseType";

export default function api(path: string, method: "get" | "post", body?: any) {
  return new Promise<ApiResponseType>((resolve) => {
    axios({
      method: method,
      url: path,
      baseURL: ApiConfig.API_URL,
      data: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        Authorization: getToken(),
      },
    })
      .then((res) => responseHandler(res, resolve))
      .catch((err) => {
        const apiResponseType: ApiResponseType = {
          status: "error",
          error: err,
        };
        resolve(apiResponseType);
      });
  });
}

function responseHandler(
  res: AxiosResponse<any>,
  resolve: (value?: ApiResponseType) => void
): void {
  if (res.status < 200 || res.status >= 300) {
    if (res.status === 401) {
      // Unauthorized
      const newToken = res.data.data?.token;
      if (!newToken) {
        const response: ApiResponseType = {
          status: "login",
          data: null,
        };

        return resolve(response);
      }
    }
    // server error
    const apiResponseType: ApiResponseType = {
      status: "error",
      error: res.data,
    };

    return resolve(apiResponseType);
  }

  if (res.data.status === "error") {
    const apiResponseType: ApiResponseType = {
      status: "ok",
      data: res.data,
    };
    return resolve(apiResponseType);
  }
  const apiResponseType: ApiResponseType = {
    status: "ok",
    data: res.data,
  };

  return resolve(apiResponseType);
}

function getToken(): string {
  const token = localStorage.getItem("AUTH_TOKEN");
  return "Bearer " + token;
}

export function saveToken(token: string): void {
  localStorage.setItem("AUTH_TOKEN", token);
}

export function isLoggedIn() {
  if (localStorage.getItem("AUTH_TOKEN")) return true;
  return false;
}

export function logOut() {
  localStorage.removeItem("AUTH_TOKEN");
}
