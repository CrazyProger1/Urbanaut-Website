import {
  ActionError,
  ActionResult,
  APIError,
  APIErrorResponse,
  APISuccessfulResponse,
} from "@/types";
import { ExternalToast, toast } from "sonner";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

type Options<T extends FieldValues> = {
  successToastMessage?: string;
  successToastOptions?: ExternalToast;
  failToastMessage?: string;
  failToastOptions?: ExternalToast;
  setError?: UseFormSetError<T>;
};

export const validateActionResult = <T extends FieldValues>(
  result: ActionResult,
  options?: Options<T>,
): boolean => {
  if (result.success) {
    if (options?.successToastMessage) {
      toast.success(options.successToastMessage, options.successToastOptions);
    }
    return true;
  } else {
    if (options?.failToastMessage) {
      result.errors?.map((error: ActionError) => {
        if (error?.field) {
          try {
            options?.setError?.(error.field as Path<T>, { message: error.message });
          } catch (e) {
            console.warn(`No field ${error.field} at the form`);
          }
        }
      });
      const toastOptions: ExternalToast = {
        description: result.errors?.length && (
          <ul className="list-disc pl-4">
            {result.errors?.map((error, i) => (
              <li key={i}>{error.message}</li>
            ))}
          </ul>
        ),
      };

      toast.error(options.failToastMessage, options.failToastOptions || toastOptions);
    }
    return false;
  }
};

export const convertAPIResponseToActionResult = (
  response: APIErrorResponse | APISuccessfulResponse,
): ActionResult => {
  if (!response.success) {
    if (response.errors?.length > 0) {
      const errors: ActionError[] = [];
      response?.errors?.forEach(({ detail, attr }: APIError) => {
        errors.push({ message: detail || "", field: attr });
      });
      return { success: false, errors: errors };
    } else {
      return { success: false };
    }
  }
  return { success: true };
};
