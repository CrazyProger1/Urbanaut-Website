import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AreaDetail } from "@/types";
import GallerySection from "./GallerySection";
import { DescriptionSection } from "./DescriptionSection";
import { TagsSection } from "./TagsSection";
import { TimelineSection } from "./TimelineSection";
import { StateSection } from "./StateSection";
import { Button } from "@/components/ui/button";
import { QUERIES } from "@/config";
import { Sheet } from "@/components/ui/next/sheet";
import { ContributorsSection } from "@/components/modules/map/sheets/ContributorsSection";
import { Pencil } from "lucide-react";

type Props = {
  area: AreaDetail;
};

export const AreaSheet = ({ area }: Props) => {
  const { description, name, tags, created_by } = area;

  return (
    <Sheet open={true} query={QUERIES.AREA_SHEET}>
      <SheetContent className="!w-full overflow-y-auto sm:!w-3/4">
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
          {created_by && <ContributorsSection creator={created_by} />}
        </div>
        <SheetFooter>
          <Button type="submit" disabled={true}>
            <Pencil />
            Suggest Correction
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
