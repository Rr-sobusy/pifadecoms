export const asyncHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T
): T => {
  return (async (...args: Parameters<T>): Promise<any> => {
    try {
      // Call the original function and return its result
      const result = await fn(...args);
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {

      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        statusCode: error.statusCode || 500,
      };
    }
  }) as T;
};
