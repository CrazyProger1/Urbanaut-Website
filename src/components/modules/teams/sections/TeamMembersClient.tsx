"use client";

import React, { useEffect, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Loader2, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { UserCard } from "@/components/modules/common/cards";
import { getTeamMembers } from "@/services";
import { APITeamMember } from "@/types";
import { PAGES, PLACEHOLDERS } from "@/config";
import { cn } from "@/lib/utils";

type OrderField = "experience" | "karma" | "score";

const ORDER_FIELDS: OrderField[] = ["experience", "karma", "score"];

const fieldLabel: Record<OrderField, string> = {
  experience: PLACEHOLDERS.LABEL_ORDER_BY_EXPERIENCE,
  karma: PLACEHOLDERS.LABEL_ORDER_BY_KARMA,
  score: PLACEHOLDERS.LABEL_ORDER_BY_SCORE,
};

type Props = {
  teamId: string;
  createdBy?: string;
};

export const TeamMembersClient = ({ teamId, createdBy }: Props) => {
  const t = useTranslations("Modules");
  const [members, setMembers] = useState<APITeamMember[]>([]);
  const [orderField, setOrderField] = useState<OrderField>("experience");
  const [isDescending, setIsDescending] = useState(true);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadMembers = (field: OrderField, desc: boolean, nextQuery: string) => {
    const ordering = desc ? `-${field}` : field;
    startTransition(async () => {
      const response = await getTeamMembers({ team: teamId, ordering, query: nextQuery });
      if (response?.results) setMembers(response.results);
    });
  };

  useEffect(() => {
    loadMembers(orderField, isDescending, query);
  }, []);

  const handleFieldChange = (value: string) => {
    const nextField = value as OrderField;
    setOrderField(nextField);
    loadMembers(nextField, isDescending, query);
  };

  const handleDirectionToggle = () => {
    const nextDesc = !isDescending;
    setIsDescending(nextDesc);
    loadMembers(orderField, nextDesc, query);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    loadMembers(orderField, isDescending, nextQuery);
  };

  const roleLabel = (member: APITeamMember) =>
    member.user.id === createdBy ? t(PLACEHOLDERS.ROLE_CAPTAIN) : t(PLACEHOLDERS.ROLE_MEMBER);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 select-none">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Users className="text-muted-foreground size-6" />
            {t(PLACEHOLDERS.TITLE_TEAM_MEMBERS)}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {t(PLACEHOLDERS.DESCRIPTION_TEAM_MEMBERS)}
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder={t(PLACEHOLDERS.LABEL_SEARCH_USERS)}
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
        {members.length === 0 ? (
          <Card className="text-muted-foreground flex items-center justify-center p-8 text-sm">
            {t(PLACEHOLDERS.LABEL_NO_USERS_YET)}
          </Card>
        ) : (
          members.map((member) => (
            <UserCard
              key={member.id}
              href={`${PAGES.PROFILE}/${member.user.usernames[0]}`}
              user={member.user}
              role={roleLabel(member)}
            />
          ))
        )}
      </div>

      {isPending && (
        <div className="text-muted-foreground pointer-events-none flex items-center justify-center gap-2 text-xs">
          <Loader2 className="size-4 animate-spin" />
        </div>
      )}
    </div>
  );
};