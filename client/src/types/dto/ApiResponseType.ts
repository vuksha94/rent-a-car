export interface ApiResponseFromServerType {
  status: string;
  statusCode: number;
  message: string;
  data?: any | any[];
}

export interface ApiResponseType {
  status: "ok" | "error" | "login";
  data: ApiResponseFromServerType | null;
}
