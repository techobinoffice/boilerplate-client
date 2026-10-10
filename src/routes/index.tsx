import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  Dashboard,
  UsersPage,
  Settings,
  ErrorPage,
} from "./pages";
import DefaultLayout from "../components/layout";
import RoleGuard from "../components/layout/roleGuard";
import { ADMIN_ROLES } from "../config/roles";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route element={<RoleGuard roles={ADMIN_ROLES} />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default PageRoutes;
