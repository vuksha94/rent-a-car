export class ApiResponse {
  status: string;
  statusCode: number;
  message?: string;
  data?: any | any[];

  constructor(
    status: string = 'success',
    statusCode: number = 0,
    message?: string,
    data?: any,
  ) {
    this.status = status;
    this.statusCode = statusCode;
    if (message !== undefined) {
      this.message = message;
    }
    if (data !== undefined) {
      this.data = data;
    }
  }
}
