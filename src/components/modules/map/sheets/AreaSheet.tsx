import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { APIRetrieveArea } from "@/types";
import GallerySection from "./GallerySection";
import { DescriptionSection } from "./DescriptionSection";
import { TagsSection } from "./TagsSection";
import { TimelineSection } from "./TimelineSection";
import { StateSection } from "./StateSection";
import { Button } from "@/components/ui/button";
import { QUERIES } from "@/config";
import { Sheet } from "@/components/ui/next/sheet";

type Props = {
  area: APIRetrieveArea;
};

export const AreaSheet = ({ area }: Props) => {
  const { description, name, tags, polygon } = area;

  return (
    <Sheet open={true} query={QUERIES.AREA_SHEET}>
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
          <Button type="submit">Suggest Correction</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
