"use client";

import React, { useMemo } from "react";
import { ALTS, QUERIES } from "@/config";
import { File } from "@/types";
import { Carousel } from "@/components/ui/next/carousel";
import { usePathname } from "@/i18n";
import { Viewer } from "@/components/common/gallery";
import { useSearchParams } from "next/navigation";

type Props = {
  photos?: File[];
};

const GallerySection = ({ photos }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const images = useMemo(() => {
    return (
      photos?.map(({ src, id }) => {
        const params = new URLSearchParams(searchParams);
        params.set(QUERIES.VIEWER_PHOTO, id);

        return {
          key: id,
          src: src,
          alt: ALTS.PLACE_PHOTO,
          href: `${pathname}?${params}`,
        };
      }) || []
    );
  }, [photos, pathname, searchParams]);

  return (
    <>
      <Carousel images={images} />
      <Viewer query={QUERIES.VIEWER_PHOTO} images={images} />
    </>
  );
};

export default GallerySection;
