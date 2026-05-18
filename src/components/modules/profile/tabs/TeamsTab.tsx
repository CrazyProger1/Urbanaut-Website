"use client";

import React, { useEffect, useState, useTransition } from "react";
import { getTeams } from "@/services/api";
import { TeamCard } from "@/components/modules/common/cards";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Users } from "lucide-react";
import { PAGES, PLACEHOLDERS } from "@/config";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APIListTeam } from "@/types";
import { cn } from "@/lib/utils";

type OrderField = "experience" | "karma" | "score";

const ORDER_FIELDS: OrderField[] = ["experience", "karma", "score"];

const fieldLabel: Record<OrderField, string> = {
  experience: PLACEHOLDERS.LABEL_ORDER_BY_EXPERIENCE,
  karma: PLACEHOLDERS.LABEL_ORDER_BY_KARMA,
  score: PLACEHOLDERS.LABEL_ORDER_BY_SCORE,
};

export const TeamsTab = () => {
  const t = useTranslations("Modules");
  const [teams, setTeams] = useState<APIListTeam[]>([]);
  const [orderField, setOrderField] = useState<OrderField>("experience");
  const [isDescending, setIsDescending] = useState(true);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadTeams = (field: OrderField, desc: boolean, nextQuery: string) => {
    const ordering = desc ? `-${field}` : field;
    startTransition(async () => {
      const response = await getTeams({ is_member: true, ordering, query: nextQuery });
      if (response?.results) setTeams(response.results);
    });
  };

  useEffect(() => {
    loadTeams(orderField, isDescending, query);
  }, []);

  const handleFieldChange = (value: string) => {
    const nextField = value as OrderField;
    setOrderField(nextField);
    loadTeams(nextField, isDescending, query);
  };

  const handleDirectionToggle = () => {
    const nextDesc = !isDescending;
    setIsDescending(nextDesc);
    loadTeams(orderField, nextDesc, query);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    loadTeams(orderField, isDescending, nextQuery);
  };

  return (
    <div className="mx-auto flex w-1/2 flex-col gap-6 select-none">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <Users className="text-muted-foreground size-6" />
              {t(PLACEHOLDERS.TITLE_MY_TEAMS)}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {t(PLACEHOLDERS.DESCRIPTION_MY_TEAMS)}
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder={t(PLACEHOLDERS.LABEL_SEARCH_TEAMS)}
            value={query}
            onChange={handleQueryChange}
            className="sm:max-w-xs"
          />
          <Tabs value={orderField} onValueChange={handleFieldChange}>
            <TabsList>
              {ORDER_FIELDS.map((field) => (
                <TabsTrigger key={field} value={field}>
                  {t(fieldLabel[field])}
                </TabsTrigger>
              ))}
              <button
                onClick={handleDirectionToggle}
                className="text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] items-center justify-center rounded-md border border-transparent px-2 py-1 transition-[color,box-shadow]"
              >
                {isDescending ? <ArrowDown className="size-4" /> : <ArrowUp className="size-4" />}
              </button>
            </TabsList>
          </Tabs>
        </div>

        <div className={cn("flex flex-col gap-3", isPending && "opacity-60")}>
          {teams.length === 0 ? (
            <Card className="text-muted-foreground flex items-center justify-center p-8 text-sm">
              {t(PLACEHOLDERS.LABEL_NO_TEAMS_YET)}
            </Card>
          ) : (
            teams.map((team) => (
              <TeamCard key={team.id} team={team} href={`${PAGES.TEAMS}/${team.id}`} />
            ))
          )}
        </div>
    </div>
  );
};