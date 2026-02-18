export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
}

export class ApiResponseHandler {
  static success<T>(
    message: string,
    data?: T,
    statusCode: number = 200
  ): ApiResponse<T> {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }

  static error(
    message: string,
    statusCode: number = 500,
    error?: string
  ): ApiResponse {
    return {
      success: false,
      statusCode,
      message,
      error: error || message,
    };
  }
}