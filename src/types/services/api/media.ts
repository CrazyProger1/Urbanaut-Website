export type APIFileType = "PHOTO" | "OTHER";

export type APIListFile = {
  id: string;
  src: string;
  created_at: string;
  updated_at?: string;
  type: APIFileType;
  is_hidden: boolean;
  created_by?: string;
};
