import { type APICurrentUser, APITokens } from "@/types";

export type APIGoogleOauthRedirectURIResponse = {
  redirect_uri: string;
};
export type APIGoogleOauthCallbackResponse = APITokens & {
  user: APICurrentUser;
};
