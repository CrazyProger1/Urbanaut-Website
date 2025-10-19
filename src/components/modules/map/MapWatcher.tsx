import { LatLng } from "leaflet";
import { useMapEvents } from "react-leaflet";

type Props = { onUpdateCoordinates?: (latlng: LatLng) => void };

export const MapWatcher = ({ onUpdateCoordinates }: Props) => {
  useMapEvents({
    mousedown: (e) => {
      onUpdateCoordinates?.(e.latlng);
    },
  });
  return null;
};
