import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PlaceDetail } from "@/types";
import GallerySection from "./GallerySection";
import { DescriptionSection } from "./DescriptionSection";
import { TagsSection } from "./TagsSection";
import { TimelineSection } from "./TimelineSection";
import { StateSection } from "./StateSection";
import { LocationSection } from "./LocationSection";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/next/sheet";
import { QUERIES } from "@/config";
import { ContributorsSection } from "./ContributorsSection";

type Props = {
  place: PlaceDetail;
};

export const PlaceSheet = ({ place }: Props) => {
  const {
    description,
    name,
    tags,
    point,
    created_at,
    abandoned_at,
    built_at,
    security,
    preservation,
    created_by,
    photos,
  } = place;

  return (
    <Sheet open={true} query={QUERIES.PLACE_SHEET}>
      <SheetContent className="!w-full overflow-y-auto sm:!w-3/4">
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>Place</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          {!!photos?.length && <GallerySection photos={photos} />}
          {description && <DescriptionSection description={description} />}
          {!!tags?.length && <TagsSection tags={tags} />}
          <TimelineSection
            createdAt={created_at ? new Date(created_at) : undefined}
            builtAt={built_at ? new Date(built_at) : undefined}
            abandonedAt={abandoned_at ? new Date(abandoned_at) : undefined}
          />
          <StateSection security={security} preservation={preservation} />
          <LocationSection point={point} />
          {created_by && <ContributorsSection creator={created_by} />}
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
};
