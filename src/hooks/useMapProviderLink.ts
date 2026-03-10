import { useMemo } from "react";
import { PROVIDERS } from "@/config";

export const useMapProviderLinks = (point: [number, number], zoom: number = 17) => {
  return useMemo(() => {
    return Object.values(PROVIDERS).map(({ link, type, name }) => {
      return { type, link: link({ point, zoom }), name };
    });
  }, [point, zoom]);
};
