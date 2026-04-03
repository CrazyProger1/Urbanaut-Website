import { UserDetail } from "@/types";

export const getUserFullName = (user: UserDetail) => {
  return `${user.first_name ? user.first_name : ""}${user.last_name ? " " + user.last_name : ""}`;
};
