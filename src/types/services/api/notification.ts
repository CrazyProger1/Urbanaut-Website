export type APINotificationType = "UPDATE" | "REMINDER" | "ALERT" | "SYSTEM" | "SOCIAL" | "SUCCESS";

export type APIRetrieveNotification = {
  id: number;
  title: string;
  subtitle?: string;
  content?: string;
  type: APINotificationType;
  triggered_at: string;
};

export type APIListNotification = {
  id: number;
  title: string;
  subtitle?: string;
  content?: string;
  type: APINotificationType;
  triggered_at: string;
};
