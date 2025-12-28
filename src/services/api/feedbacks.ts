"use server";
import { fetchAuthenticated } from "./auth";
import { API_ENDPOINTS } from "@/config";
import { APICreateFeedback } from "@/types";

export const createFeedback = async (feedback: APICreateFeedback) => {
  return await fetchAuthenticated(API_ENDPOINTS.FEEDBACKS, {
    body: JSON.stringify(feedback),
    method: "POST",
  });
};
