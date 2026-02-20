"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APICreateRequest } from "@/types";

export const createRequest = async (request: APICreateRequest) => {
  return await fetchAuthenticated(API_ENDPOINTS.REQUESTS, {
    body: JSON.stringify(request),
    method: "POST",
  });
};
