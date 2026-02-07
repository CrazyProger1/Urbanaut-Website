import React from "react";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as ShadcnCarousel,
} from "@/components/ui/carousel";
import Image from "next/image";
import { OptionalLink } from "@/components/common/utils";

export type CarouselImage = {
  src: string;
  alt?: string;
  href?: string;
};

type Props = {
  images: CarouselImage[];
};

export const Carousel = ({ images }: Props) => {
  return (
    <ShadcnCarousel>
      <CarouselContent>
        {images?.map(({ src, alt, href }) => (
          <CarouselItem key={src}>
            <OptionalLink href={href} className="relative m-1 aspect-video w-full overflow-hidden block">
              <Image
                src={src}
                alt={alt || "Carousel photo"}
                fill
                className="rounded-2xl object-cover"
              />
            </OptionalLink>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="right-auto! left-4!" />
      <CarouselNext className="right-4! left-auto!" />
    </ShadcnCarousel>
  );
};
