export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
} as const;

export const roles: string[] = Object.values(ROLES);

export const ADMIN_ROLES: string[] = [ROLES.SUPER_ADMIN, ROLES.ADMIN];

// an item without roles is open to every logged in user
export const hasRole = (role?: string, allowedRoles?: string[]) => {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  return !!role && allowedRoles.includes(role);
};
