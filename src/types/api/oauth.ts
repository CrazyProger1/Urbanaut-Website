import { type APIMeUser, APITokens } from "@/types";

export type GoogleOauthRedirectURIAPIResponse = {
  redirect_uri: string;
};
export type GoogleOauthCallbackAPIResponse = APITokens & {
  user: APIMeUser;
};
