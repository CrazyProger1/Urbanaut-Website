import { type APIMeUser } from "@/types";

export type GoogleOauthRedirectURIAPIResponse = {
  redirect_uri: string;
};
export type GoogleOauthCallbackAPIResponse = {
  user: APIMeUser;
};
