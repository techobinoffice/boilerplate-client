import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMe, getUser, getUsers } from "./api";

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
}

export function useGetUsers(
  filter: { [key: string]: string | number },
  enabled = true,
) {
  return useQuery({
    queryKey: ["users", filter],
    queryFn: () => getUsers(filter),
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useGetUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
