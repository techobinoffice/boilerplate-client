import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ErrorResponse } from "../types/user";

export const INVALID_OR_EXPIRED_TOKEN = "Invalid or expired token";

export function isSilentAuthError(message?: string, code?: string) {
  return code === "unauthorized" || message === INVALID_OR_EXPIRED_TOKEN;
}

export function toastApiError(error: AxiosError<ErrorResponse>) {
  const message = error.response?.data?.message || "An error occurred";
  if (isSilentAuthError(message)) return;
  toast.error(message);
}
