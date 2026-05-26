import { useMemo } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  file: File;
  onRemove?: () => void;
};

export const FilePreview = ({ file, onRemove }: Props) => {
  const src = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <div className="relative">
      <Image
        src={src}
        alt="File preview"
        width={100}
        height={100}
        className="h-10 w-16 object-cover"
      />
      {onRemove && (
        <span
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -right-1 -top-1 cursor-pointer rounded-full bg-destructive p-0.5 text-destructive-foreground"
        >
          <X className="h-3 w-3" />
        </span>
      )}
    </div>
  );
};
