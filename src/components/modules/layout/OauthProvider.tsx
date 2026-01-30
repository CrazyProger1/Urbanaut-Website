"use client";

import React, { useEffect } from "react";
import { QueryToast } from "@/components/common/toasts";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { useSearchParams, useRouter } from "next/navigation";
import { loginOneSignal } from "@/services/lib/onesignal";

export const OauthProvider = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has(QUERIES.OAUTH_SUCCESS)) {
      const id = searchParams.get("oauth-user");

      if (id) {
        loginOneSignal(id);

        const params = new URLSearchParams(searchParams);
        params.delete("oauth-user");
        router.replace(`?${params}`);
      }
    }
  }, [searchParams, router]);

  return (
    <>
      <QueryToast
        query={QUERIES.OAUTH_SUCCESS}
        content={PLACEHOLDERS.SUCCESSFUL_OAUTH_AUTHENTIFICATION}
      />
    </>
  );
};
