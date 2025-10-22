export type APITokens = {
  access: string;
  refresh: string;
};

export type APIAccessToken = {
  access: string;
};

export type APITokenPayload = {
  token_type: "refresh" | "access";
  exp: number;
  iat: number;
  jti: number;
  user_id: string;
};
