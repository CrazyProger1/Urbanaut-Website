"use client";

import React from "react";
import { ALTS, QUERIES } from "@/config";
import { File } from "@/types";
import { Carousel } from "@/components/ui/next/carousel";
import { usePreservedParamsLink } from "@/hooks";

type Props = {
  photos?: File[];
};

const GallerySection = ({ photos }: Props) => {
  const current = usePreservedParamsLink();
  return (
    <Carousel
      images={
        photos?.map(({ id, src }) => {
          return {
            src: src,
            alt: ALTS.PLACE_PHOTO,
            href: `${current}&${QUERIES.LIGHTBOX_PHOTO}=${id}`,
          };
        }) || []
      }
    />
  );
};

export default GallerySection;
