import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  ChangePasswordField,
  ErrorResponse,
  LoginType,
  User,
  UserField,
} from "../types/user";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  login,
  register,
  resetPassword,
  updateUser,
} from "./api";
import { toastApiError } from "../utils/toastApiError";

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: UserField) => register(data),

    onError: (error: AxiosError<ErrorResponse>) => {
      toastApiError(error);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginType) => login(data),

    onError: (error: AxiosError<ErrorResponse>) => {
      toastApiError(error);
    },

    onSuccess: (data) => {
      // drop anything cached for a previous account
      queryClient.clear();
      localStorage.setItem("user", JSON.stringify(data.data));
      toast.success(data.message);
      navigate("/dashboard");
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordField) => changePassword(data),

    onError: (error: AxiosError<ErrorResponse>) => {
      toastApiError(error);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: { email: string }) => forgotPassword(data),

    onError: (error: AxiosError<ErrorResponse>) => {
      toastApiError(error);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      resetPassword(data.token, data.newPassword),

    onError: (error: AxiosError<ErrorResponse>) => {
      toastApiError(error);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;
      payload: Partial<Pick<User, "name" | "role">>;
    }) => updateUser(data.id, data.payload),

    onError: (error: AxiosError<ErrorResponse>) => {
      toastApiError(error);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),

    onError: (error: AxiosError<ErrorResponse>) => {
      toastApiError(error);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
}
