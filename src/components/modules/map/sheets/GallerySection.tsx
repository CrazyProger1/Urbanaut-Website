import React from "react";
import Image from "next/image";
import { ALTS } from "@/config";
import { APIListFile } from "@/types/services/api/media";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  photos?: APIListFile[];
};

const GallerySection = ({ photos }: Props) => {
  return (
    <Carousel>
      <CarouselContent>
        {photos?.map(({ src, id }) => (
          <CarouselItem key={id}>
            <div className="p-1">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image src={src} alt={ALTS.PLACE_PHOTO} fill className="rounded-2xl object-cover" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="right-auto! left-4!" />
      <CarouselNext className="right-4! left-auto!" />
    </Carousel>
  );
};

export default GallerySection;
