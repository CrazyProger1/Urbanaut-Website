import { COORDINATES_REGEX } from "@/config";
import { LatLng } from "leaflet";

export const parseCoordinates = (term: string) => {
  const result = COORDINATES_REGEX.exec(term);

  if (result) {
    const [_, x1, x2, y1, y2] = result;
    return new LatLng(Number(`${x1}${x2}`), Number(`${y1}${y2}`));
  }
};
