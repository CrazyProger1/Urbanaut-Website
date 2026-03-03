import { useMemo } from "react";
import Image from "next/image";

export const FilePreview = ({ file }: { file: File }) => {
  const src = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <Image
      src={src}
      alt="File preview"
      width={100}
      height={100}
      className={"h-10 w-16 object-cover"}
    />
  );
};
