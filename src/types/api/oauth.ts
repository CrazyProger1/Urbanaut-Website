import { APIUser } from "@/types";

export type GoogleOauthRedirectURIAPIResponse = {
  redirect_uri: string;
};
export type GoogleOauthCallbackAPIResponse = APIUser;
