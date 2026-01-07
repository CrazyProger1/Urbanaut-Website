import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n";

export const usePreservedParamsLink = (
  newParams?: Record<string, string | string[] | number | number[] | boolean | undefined>,
) => {
  const currentParams = useSearchParams();
  const pathname = usePathname();
  const [url, setUrl] = useState(pathname);

  useEffect(() => {
    const params = new URLSearchParams(currentParams);

    if (newParams) {
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((subvalue) => {
              params.append(key, String(subvalue));
            });
          } else {
            params.set(key, String(value));
          }
        }
      });
    }
    if (params) {
      setUrl(`${pathname}?${params}`);
    }
  }, [newParams, pathname, currentParams]);

  return url;
};
