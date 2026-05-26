import Image from "next/image";
import { PlaceFile } from "@/types";

type Props = {
  file: PlaceFile;
};

export const ExistingFilePreview = ({ file }: Props) => {
  return (
    <Image
      src={file.src}
      alt="Place photo"
      width={100}
      height={100}
      className="h-10 w-16 rounded object-cover"
    />
  );
};
