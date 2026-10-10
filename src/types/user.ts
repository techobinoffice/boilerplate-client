export type UserField = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
export type LoginType = {
  email: string;
  password: string;
};
export type ChangePasswordField = {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
};
export type ResetPasswordField = {
  newPassword: string;
  confirmPassword?: string;
};
export type ErrorResponse = {
  success: boolean;
  message: string;
  errorMessages: {
    path: string;
    message: string;
  }[];
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  passwordChangedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

// shape kept in localStorage under the "user" key
export type StoredUser = {
  token: string;
  user: User;
};
