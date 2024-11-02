import { StatusCode } from "./customError";

interface ErrorResponse {
    success: boolean;
    message: string;
    statusCode: StatusCode;
  }

  export const asyncHandler = <T extends (...args: any[]) => Promise<any>>(
    fn: T
  ): T => {
    return (async (...args: Parameters<T>): Promise<ReturnType<T> | { success: false; message: string }> => {
      try {
        return await fn(...args);
      } catch (error: any) {
        return {
          success: false,
          message: error.message || 'An unexpected error occurred',
        };
      }
    }) as T;
  };