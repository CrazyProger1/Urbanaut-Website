"use client";

import React from "react";
import { QueryToast } from "@/components/common/toasts";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { loginOneSignal } from "@/services/lib/onesignal";
import { useTranslations } from "next-intl";

export const OauthProvider = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Modules");

  const handleOpen = async () => {
    const id = searchParams.get(QUERIES.OAUTH_USER);
    if (id) {
      await loginOneSignal(id);
    }
    router.replace(pathname);
  };

  return (
    <>
      <QueryToast
        query={QUERIES.OAUTH_SUCCESS}
        content={t(PLACEHOLDERS.TOAST_SUCCESSFUL_OAUTH_AUTHENTIFICATION)}
        onOpen={handleOpen}
      />
    </>
  );
};
