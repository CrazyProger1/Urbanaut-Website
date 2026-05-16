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
import { CurrentUser, PlaceDetail } from "@/types";
import GallerySection from "./GallerySection";
import { DescriptionSection } from "./DescriptionSection";
import { TagsSection } from "./TagsSection";
import { TimelineSection } from "./TimelineSection";
import { LocationSection } from "./LocationSection";
import { ContributorsSection } from "./ContributorsSection";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/next/sheet";
import { PAGES, PLACEHOLDERS, QUERIES, SITE_URL } from "@/config";
import { ActionsSection } from "@/components/modules/map/sheets/ActionsSection";
import { togglePlaceFavorite } from "@/actions";
import { validateActionResult } from "@/utils/actions";
import { showToast } from "@/utils/toasts";
import { useRouter } from "@/i18n";
import { usePreservedParamsLink } from "@/hooks";
import { ExploreSection } from "@/components/modules/map/sheets/SourcesSection";
import { ViewsBar, LikesBar } from "@/components/modules/common/bars";

type Props = {
  user?: CurrentUser;
  place: PlaceDetail;
};

export const PlaceSheet = ({ place, user }: Props) => {
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
    is_private,
    is_supposed,
    created_by,
    photos,
    is_favorite,
    views_count,
    favorites_count,
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
      showToast(t(PLACEHOLDERS.TOAST_PLACE_FAVORITE), "success");
    } else {
      showToast(t(PLACEHOLDERS.TOAST_PLACE_NOT_FAVORITE), "success");
    }
    router.push(updatePageLink);
  };

  return (
    <Sheet open={true} query={QUERIES.SHEET_PLACE}>
      <SheetContent className="w-full! overflow-y-auto select-none sm:w-3/4!">
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>{t(PLACEHOLDERS.TITLE_PLACE)}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-8 p-4">
          {!!photos?.length && <GallerySection photos={photos} />}

          <div className="flex flex-wrap justify-center gap-1">
            {views_count !== undefined && <ViewsBar views={views_count} />}
            {favorites_count !== undefined && <LikesBar likes={favorites_count} />}
          </div>

          {description && <DescriptionSection description={description} />}
          {(!!tags?.length ||
            is_supposed ||
            is_private ||
            security?.has_security ||
            preservation) && (
            <TagsSection
              tags={tags ?? []}
              isSupposed={is_supposed}
              isPrivate={is_private}
              hasSecurity={security?.has_security}
              preservation={preservation}
            />
          )}

          <TimelineSection
            createdAt={created_at ? new Date(created_at) : undefined}
            builtAt={built_at ? new Date(built_at) : undefined}
            abandonedAt={abandoned_at ? new Date(abandoned_at) : undefined}
          />
          <LocationSection point={point} />

          {created_by && <ContributorsSection creator={created_by} />}
          <ActionsSection
            shareLink={`${SITE_URL}${PAGES.MAP}?${QUERIES.SHEET_PLACE}=${id}`}
            editLink={`${PAGES.MAP}?${QUERIES.SHEET_PLACE}=${id}&${QUERIES.MODAL_EDIT_PLACE}=true`}
            complainLink={`${PAGES.MAP}?${QUERIES.SHEET_PLACE}=${id}&${QUERIES.MODAL_CREATE_COMPLAIN}=true`}
            planExpeditionLink={
              user &&
              `${PAGES.MAP}?${QUERIES.SHEET_PLACE}=${id}&${QUERIES.MODAL_CREATE_EXPEDITION}=true`
            }
            isFavorite={is_favorite}
            toggleFavoriteAction={togglePlaceFavoriteStatus}
          />
          <ExploreSection point={place.point} />
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
