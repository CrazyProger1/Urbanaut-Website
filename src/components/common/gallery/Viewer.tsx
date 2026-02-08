"use client";

import ReactLightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { NextImage } from "./NextImage";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n";
import { usePreservedParamsLink } from "@/hooks";

type Slide = {
  key: string;
  src: string;
  alt?: string;
};

type Props = {
  images: Slide[];
  query: string;
};

export const Viewer = ({ query, images }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const closeLink = usePreservedParamsLink({ [query]: false });
  const isOpen = useMemo(() => {
    return searchParams.has(query);
  }, [query, searchParams]);

  const index = useMemo(() => {
    const currentImageKey = searchParams.get(query);
    return images.findIndex(({ key }) => key === currentImageKey);
  }, [searchParams]);

  const handleChangeSlide = useCallback(
    ({ index }: { index: number }) => {
      const key = images[index].key;
      const params = new URLSearchParams(searchParams);
      params.delete(query);
      params.set(query, key);
      router.push(`${pathname}?${params}`);
    },
    [images, pathname, searchParams],
  );

  return (
    <>
      <ReactLightbox
        open={isOpen}
        close={() => {
          router.push(closeLink);
        }}
        index={index}
        slides={images}
        render={{ slide: NextImage }}
        styles={{ root: { pointerEvents: "auto" } }}
        on={{
          view: handleChangeSlide,
        }}
      />
    </>
  );
};
