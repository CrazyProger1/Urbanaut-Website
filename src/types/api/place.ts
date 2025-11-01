import { APIPoint } from "./geo";

export type APIPlace = {
  id: number;
  name: string;
  description?: string;
  point: APIPoint;
  tags?: string[];
};

export type APICreatePlace = {
  name: string;
  point: APIPoint;
};
