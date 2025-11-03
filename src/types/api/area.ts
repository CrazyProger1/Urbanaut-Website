import { APIPoint } from "@/types";

export type APIArea = {
  id: number;
  name: string;
  description?: string;
  polygon: APIPoint[];
  tags?: string[];
};

export type APICreateArea = {
  name: string;
  polygon: APIPoint[];
};
