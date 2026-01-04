import { APIError, ErrorAPIResponse, SuccessfulAPIResponse } from "@/types";
import { toast } from "sonner";

export const validateResponse = (
  response: ErrorAPIResponse | SuccessfulAPIResponse,
  message: string = "An error occurred",
): boolean => {
  const SHOW_TOAST_ONLY_CODES = ["permission_denied"];
  if (!response.success) {
    const items: string[] = [];

    response.errors.forEach(({ code, detail }: APIError) => {
      if (SHOW_TOAST_ONLY_CODES.includes(code || "permission_denied")) {
        items.push(detail || "");
      }
    });
    if (items.length) {
      if (items.length > 1) {
        toast.error(message, {
          description: (
            <ul className="list-disc pl-4">
              {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
          ),
        });
      } else {
        toast.error(message, { description: items[0] });
      }
    }
  }
  return response.success;
};
