export type APIRequestType = "OTHER" | "COMPLAINT" | "CORRECTION";
export type APICreateRequest = {
  context: object;
  type?: APIRequestType;
  path?: string;
};
