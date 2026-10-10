import { StoredUser } from "../types/user";

export const getStoredUser = (): StoredUser | null => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};
