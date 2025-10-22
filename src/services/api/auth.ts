import { getSession } from "@/utils/session";
import { fetchAPI } from "@/services";

export const fetchAuthenticated = async <T>(endpoint: string, options?: RequestInit) => {
  const session = await getSession();
  return await fetchAPI<T>(endpoint, {
    accessToken: session?.accessToken,
    ...options,
  });
};
