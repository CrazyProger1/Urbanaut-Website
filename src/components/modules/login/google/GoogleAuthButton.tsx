import React from "react";
import { getGoogleOAuthRedirectUri } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link } from "@/i18n";
import { PLACEHOLDERS } from "@/config";

export const GoogleAuthButton = async () => {
  const response = await getGoogleOAuthRedirectUri();
  return (
    <Button asChild variant="outline">
      <Link href={response.redirect_uri}>
        <FaGoogle />
        <p>{PLACEHOLDERS.BUTTON_GOOGLE_AUTH}</p>
      </Link>
    </Button>
  );
};
