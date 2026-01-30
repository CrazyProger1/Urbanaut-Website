"use client";

import React from "react";
import { QueryToast } from "@/components/common/toasts";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { loginOneSignal } from "@/services/lib/onesignal";

export const OauthProvider = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const closeModal = async () => {
    const id = searchParams.get(QUERIES.OAUTH_USER);
    if (id) {
      console.log("USER ID:", id)
      await loginOneSignal(id);
    }
    router.replace(pathname);
    console.log("Modal closed");
  };

  return (
    <>
      <QueryToast
        query={QUERIES.OAUTH_SUCCESS}
        content={PLACEHOLDERS.SUCCESSFUL_OAUTH_AUTHENTIFICATION}
        onClose={closeModal}
      />
    </>
  );
};
