import React from "react";
import { getGoogleOAuthRedirectUri } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link } from "@/i18n";
import { PLACEHOLDERS } from "@/config";
import { getTranslations } from "next-intl/server";

export const GoogleAuthButton = async () => {
  const t = await getTranslations("Modules");
  const response = await getGoogleOAuthRedirectUri();
  return (
    <Button asChild variant="outline">
      <Link href={response.redirect_uri}>
        <FaGoogle />
        <p>{t(PLACEHOLDERS.BUTTON_GOOGLE_AUTH)}</p>
      </Link>
    </Button>
  );
};
