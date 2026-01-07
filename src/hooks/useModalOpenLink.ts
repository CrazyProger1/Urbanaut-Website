import { usePreservedParamsLink } from "@/hooks/usePreservedParamsLink";

export const useModalOpenLink = (query: string) => {
  return usePreservedParamsLink({ [query]: true });
};
