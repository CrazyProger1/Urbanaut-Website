"use client";

import React, { useMemo } from "react";
import { ALTS, QUERIES } from "@/config";
import { File } from "@/types";
import { Carousel } from "@/components/ui/next/carousel";
import { usePathname } from "@/i18n";

type Props = {
  photos?: File[];
};

const GallerySection = ({ photos }: Props) => {
  const searchParams = new URLSearchParams();
  const pathname = usePathname();

  const images = useMemo(() => {
    return (
      photos?.map(({ src, id }) => {
        const params = new URLSearchParams(searchParams);
        params.set(QUERIES.LIGHTBOX_PHOTO, id);

        return {
          src: src,
          alt: ALTS.PLACE_PHOTO,
          href: `${pathname}?${params}`,
        };
      }) || []
    );
  }, [photos, pathname]);
  return <Carousel images={images} />;
};

export default GallerySection;
