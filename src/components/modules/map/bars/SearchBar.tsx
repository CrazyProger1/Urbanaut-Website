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
import { COORDINATES_REGEX, QUERIES } from "@/config";
import { useRouter, useSearchParams } from "next/navigation";
import { usePreservedParamsLink } from "@/hooks";
import { ClickToast } from "@/components/common/toasts";
import { LatLng } from "leaflet";
import { useMapStore } from "@/stores";

const FILTER_PARAMS = new Set(["preservation", "tags", "country"]);

type Props = {
  onSearchByCoordinates?: (coordinates: LatLng) => void;
};

export const SearchBar = ({ onSearchByCoordinates }: Props) => {
  const params = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isAIActive, setIsAIActive] = useState(false);
  const openFilterModalLink = useModalOpenLink(QUERIES.FILTERS_MODAL);
  const [query, setQuery] = useState("");
  const searchLink = usePreservedParamsLink({ query: query, ai_query: "" });
  const aiSearchLink = usePreservedParamsLink({ ai_query: query, query: "" });
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const router = useRouter();
  const { setLastSearchTerm, loadLastSearchTerm, lastSearchTerm } = useMapStore();

  useEffect(() => {
    setIsFiltersActive(FILTER_PARAMS.intersection(new Set(params.keys())).size > 0);

    if (!query) {
      const term = params.get("query") || params.get("ai_query") || loadLastSearchTerm();
      setQuery(term || "");
    }
  }, [params]);

  const handleSearch = () => {
    setLastSearchTerm(query);
    if (COORDINATES_REGEX.test(query)) {
      const result = COORDINATES_REGEX.exec(query);

      if (result) {
        const [input, x1, x2, y1, y2] = result;
        onSearchByCoordinates?.(new LatLng(Number(`${x1}${x2}`), Number(`${y1}${y2}`)));
      }
    } else {
      if (isAIActive) {
        router.push(aiSearchLink);
      } else {
        router.push(searchLink);
      }
    }
  };

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-4 md:flex-row">
      <Card className="bg-background/80 max-w-fit items-center rounded-2xl px-2 py-1 shadow-lg backdrop-blur-sm">
        <Toggle
          pressed={isOpen}
          onPressedChange={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <Search />
        </Toggle>
      </Card>
      {isOpen && (
        <Card
          className={cn(
            "bg-background/80 flex flex-row items-center gap-1 rounded-2xl backdrop-blur-sm",
            "px-2 py-1 shadow-lg",
          )}
        >
          <div className="flex flex-row gap-1">
            <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button type="submit" variant="ghost" onClick={handleSearch}>
              <Search />
            </Button>
          </div>

          <Toggle pressed={isFiltersActive} asChild>
            <Link href={openFilterModalLink} scroll={false}>
              <Filter />
            </Link>
          </Toggle>

          <ClickToast message={isAIActive ? "AI mode disabled" : "AI mode enabled"}>
            <Toggle onPressedChange={setIsAIActive}>
              <Sparkles />
            </Toggle>
          </ClickToast>
        </Card>
      )}
    </div>
  );
};
