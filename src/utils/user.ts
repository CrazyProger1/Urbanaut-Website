import { User } from "@/types";

export const getUserFullName = (user: User) => {
  return `${user.first_name ? user.first_name : ""}${user.last_name ? " " + user.last_name : ""}`;
};
