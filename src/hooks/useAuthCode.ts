"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QUERIES } from "@/config";

export const useAuthCode = () => {
  const searchParams = useSearchParams();
  const [authCode, setAuthCode] = useState<string | undefined>();
  useEffect(() => {
    const code = searchParams.get(QUERIES.AUTH_CODE);

    setAuthCode(code ?? undefined);
  }, [searchParams]);

  return authCode;
};
