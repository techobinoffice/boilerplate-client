export const logoutCleanup = (): void => {
  localStorage.removeItem("user");
};
