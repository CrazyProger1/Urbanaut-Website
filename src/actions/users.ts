"use server";

import { APIUpdateUser } from "@/types";
import * as services from "@/services";

export const updateUser = async (user: APIUpdateUser) => {
  return await services.updateUser(user);
};
