"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "@/i18n";
import { APIArea } from "@/types";
import GallerySection from "./GallerySection";
import { DescriptionSection } from "./DescriptionSection";
import { TagsSection } from "./TagsSection";
import { TimelineSection } from "./TimelineSection";
import { StateSection } from "./StateSection";
import { LocationSection } from "./LocationSection";
import { Button } from "@/components/ui/button";

type Props = {
  area: APIArea;
};

export function AreaSheet({ area }: Props) {
  const { description, name, tags, polygon } = area;

  const router = useRouter();

  const handleToggle = (open: boolean) => {
    if (!open) {
      router.push("/map");
    }
  };
  return (
    <Sheet open={true} onOpenChange={handleToggle}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>Area</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <GallerySection />
          {description && <DescriptionSection description={description} />}
          {tags && <TagsSection tags={tags} />}
          <TimelineSection />
          <StateSection />
        </div>
        <SheetFooter>
          <Button type="submit">Edit</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
