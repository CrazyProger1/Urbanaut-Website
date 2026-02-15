"use client";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { PlaceDetail } from "@/types";
import GallerySection from "./GallerySection";
import { DescriptionSection } from "./DescriptionSection";
import { TagsSection } from "./TagsSection";
import { TimelineSection } from "./TimelineSection";
import { StateSection } from "./StateSection";
import { LocationSection } from "./LocationSection";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/next/sheet";
import { PAGES, PLACEHOLDERS, QUERIES, SITE_URL } from "@/config";
import { ContributorsSection } from "./ContributorsSection";

import { ActionsSection } from "@/components/modules/map/sheets/ActionsSection";
import { togglePlaceFavorite } from "@/actions";
import { validateActionResult } from "@/utils/actions";
import { toast } from "sonner";
import { useRouter } from "@/i18n";
import { usePreservedParamsLink } from "@/hooks";

type Props = {
  place: PlaceDetail;
};

export const PlaceSheet = ({ place }: Props) => {
  const t = useTranslations("Modules");
  const router = useRouter();
  const {
    id,
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
    is_favorite,
  } = place;

  const updatePageLink = usePreservedParamsLink();

  const togglePlaceFavoriteStatus = async () => {
    const result = await togglePlaceFavorite(id);
    const validationOptions = {
      failToastMessage: t(PLACEHOLDERS.TOAST_PLACE_FAVORITE_FAIL),
    };

    if (!validateActionResult(result, validationOptions)) {
      return;
    }

    if (result.is_favorite) {
      toast.success(t(PLACEHOLDERS.TOAST_PLACE_FAVORITE));
    } else {
      toast.success(t(PLACEHOLDERS.TOAST_PLACE_NOT_FAVORITE));
    }
    router.push(updatePageLink);
  };

  return (
    <Sheet open={true} query={QUERIES.SHEET_PLACE}>
      <SheetContent className="w-full! overflow-y-auto sm:w-3/4! select-none">
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>{t(PLACEHOLDERS.TITLE_PLACE)}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          {!!photos?.length && (
            <>
              <GallerySection photos={photos} />
            </>
          )}

          {description && (
            <>
              <DescriptionSection description={description} />
            </>
          )}

          {!!tags?.length && (
            <>
              <TagsSection tags={tags} />
            </>
          )}

          <TimelineSection
            createdAt={created_at ? new Date(created_at) : undefined}
            builtAt={built_at ? new Date(built_at) : undefined}
            abandonedAt={abandoned_at ? new Date(abandoned_at) : undefined}
          />
          <StateSection security={security} preservation={preservation} />
          <LocationSection point={point} />

          {created_by && (
            <>
              <ContributorsSection creator={created_by} />
            </>
          )}
          <ActionsSection
            shareLink={`${SITE_URL}${PAGES.MAP}?${QUERIES.SHEET_PLACE}=${id}`}
            isFavorite={is_favorite}
            toggleFavoriteAction={togglePlaceFavoriteStatus}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">{t(PLACEHOLDERS.BUTTON_CLOSE)}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
