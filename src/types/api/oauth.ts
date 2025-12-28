import { type APICurrentUser, APITokens } from "@/types";

export type GoogleOauthRedirectURIAPIResponse = {
  redirect_uri: string;
};
export type GoogleOauthCallbackAPIResponse = APITokens & {
  user: APICurrentUser;
};
