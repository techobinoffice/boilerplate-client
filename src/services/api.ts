import api from "../lib";
import { ApiResponse, Meta } from "../types";
import {
  AuthTokens,
  ChangePasswordField,
  LoginType,
  StoredUser,
  User,
  UserField,
} from "../types/user";

export const register = async (data: UserField) => {
  const { name, email, password } = data;
  const result = await api.post<ApiResponse<User, null>>("/auth/register", {
    name,
    email,
    password,
  });
  return result.data;
};

// the api only returns tokens on login, so the profile is fetched right after
export const login = async (
  data: LoginType,
): Promise<ApiResponse<StoredUser, null>> => {
  const result = await api.post<ApiResponse<AuthTokens, null>>(
    "/auth/login",
    data,
  );
  const token = result.data.data.accessToken;
  const me = await api.get<ApiResponse<User, null>>("/users/me", {
    headers: { Authorization: token },
  });
  return { ...result.data, data: { token, user: me.data.data } };
};

export const changePassword = async (data: ChangePasswordField) => {
  const { oldPassword, newPassword } = data;
  const result = await api.post<ApiResponse<null, null>>(
    "/auth/change-password",
    { oldPassword, newPassword },
  );
  return result.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const result = await api.post<ApiResponse<null, null>>(
    "/auth/forgot-password",
    data,
  );
  return result.data;
};

// token comes from the reset link and is sent in the Authorization header
export const resetPassword = async (token: string, newPassword: string) => {
  const result = await api.post<ApiResponse<null, null>>(
    "/auth/reset-password",
    { newPassword },
    { headers: { Authorization: token } },
  );
  return result.data;
};

export const getMe = async () => {
  return (await api.get<ApiResponse<User, null>>("/users/me")).data;
};

export const getUsers = async (
  filter: { [key: string]: string | number } = {},
) => {
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      params.append(key, value.toString());
    }
  });

  return (
    await api.get<ApiResponse<User[], Meta>>(`/users?${params.toString()}`)
  ).data;
};

export const getUser = async (id: string) => {
  return (await api.get<ApiResponse<User, null>>(`/users/${id}`)).data;
};

export const updateUser = async (
  id: string,
  data: Partial<Pick<User, "name" | "role">>,
) => {
  const result = await api.patch<ApiResponse<User, null>>(`/users/${id}`, data);
  return result.data;
};

export const deleteUser = async (id: string) => {
  const result = await api.delete<ApiResponse<User, null>>(`/users/${id}`);
  return result.data;
};
