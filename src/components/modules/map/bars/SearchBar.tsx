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
import { QUERIES } from "@/config";
import { useSearchParams } from "next/navigation";
import { usePreservedParamsLink } from "@/hooks";

const FILTER_PARAMS = new Set(["preservation", "tags"]);

export const SearchBar = () => {
  const params = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isAIActive, setIsAIActive] = useState(false);
  const openFilterModalLink = useModalOpenLink(QUERIES.FILTERS_MODAL);
  const [query, setQuery] = useState("");
  const searchLink = usePreservedParamsLink({ query: query });
  const aiSearchLink = usePreservedParamsLink({ ai_query: query });
  const [isFiltersActive, setIsFiltersActive] = useState(false);

  useEffect(() => {
    setIsFiltersActive(FILTER_PARAMS.intersection(new Set(params.keys())).size > 0);
  }, [params]);

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
            <Button type="submit" variant="ghost" asChild>
              <Link href={isAIActive ? aiSearchLink : searchLink}>
                <Search />
              </Link>
            </Button>
          </div>

          <Toggle pressed={isFiltersActive} asChild>
            <Link href={openFilterModalLink} scroll={false}>
              <Filter />
            </Link>
          </Toggle>

          <Toggle onPressedChange={setIsAIActive}>
            <Sparkles />
          </Toggle>
        </Card>
      )}
    </div>
  );
};
