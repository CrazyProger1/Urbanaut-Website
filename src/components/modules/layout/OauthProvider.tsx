"use client";

import React, { useEffect, useTransition } from "react";
import { QueryToast } from "@/components/common/toasts";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { useSearchParams, useRouter } from "next/navigation";
import { loginOneSignal } from "@/services/lib/onesignal";

export const OauthProvider = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has(QUERIES.OAUTH_SUCCESS)) {
      const id = searchParams.get(QUERIES.OAUTH_USER);

      if (id) {
        loginOneSignal(id).then(() => {
          console.log("Logged in one signal");
        });
      }
    }
  }, [searchParams, router]);

  return (
    <>
      <QueryToast
        query={QUERIES.OAUTH_SUCCESS}
        content={PLACEHOLDERS.SUCCESSFUL_OAUTH_AUTHENTIFICATION}
        onClose={() => {
          router.replace("");
        }}
      />
    </>
  );
};
