import React from "react";
import { fetchAuthenticated } from "@/services/api";
import { APIGoogleOauthRedirectURIResponse } from "@/types";
import { API_ENDPOINTS } from "@/config";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link } from "@/i18n";

export const GoogleAuthButton = async () => {
  const response = await fetchAuthenticated<APIGoogleOauthRedirectURIResponse>(
    API_ENDPOINTS.GOOGLE_OAUTH_REDIRECT_URI,
  );
  return (
    <Button asChild variant="outline">
      <Link href={response.redirect_uri}>
        <FaGoogle />
        <p>Sign In/Up with Google</p>
      </Link>
    </Button>
  );
};
