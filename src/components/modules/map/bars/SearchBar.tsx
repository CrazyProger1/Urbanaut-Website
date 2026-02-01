"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "@/i18n";
import { useModalOpenLink } from "@/hooks/useModalOpenLink";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { useRouter, useSearchParams } from "next/navigation";
import { usePreservedParamsLink } from "@/hooks";
import { ClickToast } from "@/components/common/toasts";
import { useMapStore } from "@/stores";
import { LatLng } from "leaflet";
import { parseCoordinates } from "@/utils/map";
import { StopPropagation } from "@/components/common/modals";
import { Tooltip } from "@/components/ui/next/tooltip";

const FILTER_PARAMS = new Set(["preservation", "security", "tags", "country"]);

type Props = {
  onSearchByCoordinates?: (point: LatLng) => void;
};

export const SearchBar = ({ onSearchByCoordinates }: Props) => {
  const params = useSearchParams();
  const [isAIActive, setIsAIActive] = useState(false);
  const openFilterModalLink = useModalOpenLink(QUERIES.MAP_FILTERS_MODAL);
  const [query, setQuery] = useState("");
  const searchLink = usePreservedParamsLink({ query: query, ai_query: "", point: "" });
  const aiSearchLink = usePreservedParamsLink({ ai_query: query, query: "", point: "" });
  const pointSearchLink = usePreservedParamsLink({ point: query, ai_query: "", query: "" });
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const router = useRouter();
  const { setLastSearchTerm, loadLastSearchTerm, isSearchBarOpen, toggleSearchBar } = useMapStore();

  useEffect(() => {
    setIsFiltersActive(FILTER_PARAMS.intersection(new Set(params.keys())).size > 0);

    if (!query) {
      const term =
        params.get("query") ||
        params.get("ai_query") ||
        params.get(QUERIES.MAP_SELECTED_POINT) ||
        loadLastSearchTerm();
      setQuery(term || "");
    }
  }, [params]);

  const handleSearch = () => {
    setLastSearchTerm(query);
    const coordinates = parseCoordinates(query);

    if (coordinates) {
      onSearchByCoordinates?.(coordinates);
      return router.push(pointSearchLink);
    }

    if (isAIActive) {
      router.push(aiSearchLink);
    } else {
      router.push(searchLink);
    }
  };

  return (
    <StopPropagation className="absolute top-4 left-4 flex flex-col gap-4 pr-4 md:flex-row">
      <Card className="bg-background/80 max-w-fit items-center rounded-2xl px-2 py-1 shadow-lg backdrop-blur-sm">
        <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_SEARCH_BAR} asChild>
          <Toggle pressed={isSearchBarOpen} onPressedChange={toggleSearchBar}>
            <Search />
          </Toggle>
        </Tooltip>
      </Card>
      {isSearchBarOpen && (
        <Card
          className={cn(
            "bg-background/80 flex flex-row items-center gap-1 rounded-2xl backdrop-blur-sm",
            "px-2 py-1 shadow-lg",
          )}
        >
          <div className="flex flex-row gap-1">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Tooltip content={PLACEHOLDERS.TOOLTIP_SEARCH} asChild>
              <Button type="submit" variant="ghost" onClick={handleSearch}>
                <Search />
              </Button>
            </Tooltip>
          </div>

          <Tooltip content={PLACEHOLDERS.TOOLTIP_FILTERS}>
            <Toggle pressed={isFiltersActive} asChild>
              <Link href={openFilterModalLink} scroll={false}>
                <Filter />
              </Link>
            </Toggle>
          </Tooltip>

          <ClickToast message={isAIActive ? PLACEHOLDERS.TOAST_AI_MODE_DISABLED: PLACEHOLDERS.TOAST_AI_MODE_ENABLED}>
            <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_AI_SEARCH} asChild>
              <Toggle onPressedChange={setIsAIActive} pressed={isAIActive}>
                <Sparkles />
              </Toggle>
            </Tooltip>
          </ClickToast>
        </Card>
      )}
    </StopPropagation>
  );
};
