export type SessionUser = {
  id: number;
};

export type Session = {
  accessToken?: string;
  refreshToken?: string;
  user?: SessionUser;
};
