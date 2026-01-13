import React from "react";
import { getGoogleOAuthRedirectUri } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link } from "@/i18n";

export const GoogleAuthButton = async () => {
  const response = await getGoogleOAuthRedirectUri();
  return (
    <Button asChild variant="outline">
      <Link href={response.redirect_uri}>
        <FaGoogle />
        <p>Sign In/Up with Google</p>
      </Link>
    </Button>
  );
};
