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
import { PAGES, PLACEHOLDERS, QUERIES, SITE_URL } from "@/config";
import { Sheet } from "@/components/ui/next/sheet";
import { ContributorsSection } from "./ContributorsSection";
import { ActionsSection } from "./ActionsSection";

type Props = {
  area: AreaDetail;
};

export const AreaSheet = ({ area }: Props) => {
  const { id, description, name, tags, created_by } = area;

  return (
    <Sheet open={true} query={QUERIES.SHEET_AREA}>
      <SheetContent className="w-full! overflow-y-auto sm:w-3/4!">
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>{PLACEHOLDERS.TITLE_AREA}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <GallerySection />

          {description && <DescriptionSection description={description} />}
          {tags && <TagsSection tags={tags} />}
          <TimelineSection />
          <StateSection />
          {created_by && <ContributorsSection creator={created_by} />}
          <ActionsSection shareLink={`${SITE_URL}${PAGES.MAP}?${QUERIES.SHEET_AREA}=${id}`} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">{PLACEHOLDERS.BUTTON_CLOSE}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
