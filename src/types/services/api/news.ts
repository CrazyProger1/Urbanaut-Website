export type APINewsType = "UPDATE" | "REMINDER" | "ALERT" | "SYSTEM" | "SOCIAL" | "SUCCESS";

export type APIListNews = {
  id: number;
  title: string;
  subtitle?: string;
  published_at: string;
  created_by?: string;
  has_more: boolean;
  type: APINewsType;
};

export type APIRetrieveNews = APIListNews & {
  content?: string;
};
