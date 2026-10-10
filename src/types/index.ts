export interface ApiResponse<T, M> {
  statusCode: number;
  success: boolean;
  message: string;
  meta: M | null;
  data: T;
}
export interface Meta {
  page: number;
  limit: number;
  total: number;
}
