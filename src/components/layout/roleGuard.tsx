import { Navigate, Outlet } from "react-router-dom";
import { hasRole } from "../../config/roles";
import { getStoredUser } from "../../utils/auth";

type Props = {
  roles: string[];
};

// wraps routes that only some roles may open, the api enforces the same rule
const RoleGuard = ({ roles }: Props) => {
  const role = getStoredUser()?.user?.role;

  if (!hasRole(role, roles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
