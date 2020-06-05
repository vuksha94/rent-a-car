export interface ApiResponseFromServerType {
  status: string;
  statusCode: number;
  message: string;
  data?: any | any[];
  error?: any; // server error message
}

export interface ApiResponseType {
  status: "ok" | "error" | "login";
  data?: ApiResponseFromServerType | null;
  error?: ServerErrorType;
}

interface ServerErrorType {
  message: string[];
  error: string;
  statusCode: number;
}
