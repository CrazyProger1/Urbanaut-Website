import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n";
import { buildParamsFromRecord, ParamRecord } from "@/utils/params";

export const usePreservedParamsLink = (newParams?: ParamRecord) => {
  const currentParams = useSearchParams();
  const pathname = usePathname();
  const [url, setUrl] = useState(pathname);

  useEffect(() => {
    const params = buildParamsFromRecord(newParams || {}, currentParams);
    if (params) {
      setUrl(`${pathname}?${params}`);
    }
  }, [newParams, pathname, currentParams]);

  return url;
};
