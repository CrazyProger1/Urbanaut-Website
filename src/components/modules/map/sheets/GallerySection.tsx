import React from "react";
import Image from "next/image";
import { ALTS, STUBS } from "@/config";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  photos?: string[];
};

const GallerySection = ({ photos }: Props) => {
  return (
    <div className="relative h-60 w-full">
      <Image className="rounded-2xl" src={STUBS.PLACE_PHOTO} alt={ALTS.PLACE_PHOTO} fill={true} />
      <div>
        <button
          type="button"
          className="absolute top-1/2 left-0.5 -translate-y-1/2 cursor-pointer hover:text-white"
        >
          <ChevronLeft size={64} />
        </button>

        <button
          type="button"
          className="absolute top-1/2 right-0.5 -translate-y-1/2 cursor-pointer hover:text-white"
        >
          <ChevronRight size={64} />
        </button>
      </div>
    </div>
  );
};

export default GallerySection;
