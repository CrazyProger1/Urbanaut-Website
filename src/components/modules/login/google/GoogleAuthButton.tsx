import React from "react";
import { fetchAPI } from "@/services";
import { GoogleOauthRedirectURIAPIResponse } from "@/types";
import { API_ENDPOINTS } from "@/config";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Link } from "@/i18n";

export const GoogleAuthButton = async () => {
  const response = await fetchAPI<GoogleOauthRedirectURIAPIResponse>(
    API_ENDPOINTS.GOOGLE_OAUTH_REDIRECT_URI,
  );
  return (
    <Button asChild>
      <Link href={response.redirect_uri}>
        <FaGoogle />
        <p>Sign In/Up with Google</p>
      </Link>
    </Button>
  );
};
