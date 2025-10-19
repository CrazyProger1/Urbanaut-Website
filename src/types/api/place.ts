import { APIPoint } from "./geo";


export type APIPlace = {
  id: number;
  name: string;
  point: APIPoint;
}