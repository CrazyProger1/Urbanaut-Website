import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { APIPlace } from "@/types";
import GallerySection from "./GallerySection";
import { DescriptionSection } from "./DescriptionSection";
import { TagsSection } from "./TagsSection";
import { TimelineSection } from "./TimelineSection";
import { StateSection } from "./StateSection";
import { LocationSection } from "./LocationSection";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/next/sheet";
import { QUERIES } from "@/config";

type Props = {
  place: APIPlace;
};

export function PlaceSheet({ place }: Props) {
  const { description, name, tags, point, created_at, abandoned_at, built_at } = place;

  return (
    <Sheet open={true} query={QUERIES.PLACE_SHEET}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>Place</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <GallerySection />
          {description && <DescriptionSection description={description} />}
          {!!tags?.length && <TagsSection tags={tags} />}
          {(created_at || abandoned_at || built_at) && <TimelineSection />}
          <StateSection />
          <LocationSection point={point} />
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
