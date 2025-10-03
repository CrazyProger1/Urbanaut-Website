import { fetchAPI } from "@/services";
import { API_ENDPOINTS } from "@/config";
import { GoogleOauthRedirectURIAPIResponse } from "@/types/api";
import { Link } from "@/i18n";

const Page = async () => {
  const response = await fetchAPI<GoogleOauthRedirectURIAPIResponse>(
    API_ENDPOINTS.GOOGLE_OAUTH_REDIRECT_URI,
  );
  return (
    <div>
      <Link href={response.redirect_uri}>Login with Google</Link>
    </div>
  );
};

export default Page;
