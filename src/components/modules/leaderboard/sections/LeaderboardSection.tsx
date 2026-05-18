"use client";

import React, { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Loader2, Trophy, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TeamCard, UserCard } from "@/components/modules/common/cards";
import { APIListTeam, User } from "@/types";
import { getTeams, getUsers } from "@/services";
import { PAGES, PLACEHOLDERS } from "@/config";
import { cn } from "@/lib/utils";

type OrderField = "experience" | "karma" | "score";

type LeaderboardTab = "users" | "teams";

type Props = {
  initialUsers: User[];
  initialTeams: APIListTeam[];
  initialOrdering: string;
};

const ORDER_FIELDS: OrderField[] = ["experience", "karma", "score"];

const fieldLabel: Record<OrderField, string> = {
  experience: PLACEHOLDERS.LABEL_ORDER_BY_EXPERIENCE,
  karma: PLACEHOLDERS.LABEL_ORDER_BY_KARMA,
  score: PLACEHOLDERS.LABEL_ORDER_BY_SCORE,
};

export const LeaderboardSection = ({ initialUsers, initialTeams, initialOrdering }: Props) => {
  const t = useTranslations("Modules");
  const [users, setUsers] = useState(initialUsers);
  const [teams, setTeams] = useState(initialTeams);
  const [orderField, setOrderField] = useState<OrderField>(
    (initialOrdering.replace("-", "") as OrderField) ?? "experience",
  );
  const [isDescending, setIsDescending] = useState(initialOrdering.startsWith("-"));
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("users");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadUsers = (field: OrderField, desc: boolean, nextQuery: string) => {
    const ordering = desc ? `-${field}` : field;
    startTransition(async () => {
      const response = await getUsers({ ordering, query: nextQuery });
      if (response.success) setUsers(response.results);
    });
  };

  const loadTeams = (field: OrderField, desc: boolean, nextQuery: string) => {
    const ordering = desc ? `-${field}` : field;
    startTransition(async () => {
      const response = await getTeams({ ordering, query: nextQuery });
      if (response.success) setTeams(response.results);
    });
  };

  const loadBoth = (field: OrderField, desc: boolean, nextQuery: string) => {
    const ordering = desc ? `-${field}` : field;
    startTransition(async () => {
      const [usersResponse, teamsResponse] = await Promise.all([
        getUsers({ ordering, query: nextQuery }),
        getTeams({ ordering, query: nextQuery }),
      ]);
      if (usersResponse.success) setUsers(usersResponse.results);
      if (teamsResponse.success) setTeams(teamsResponse.results);
    });
  };

  const handleTabChange = (value: string) => {
    const nextTab = value as LeaderboardTab;
    setActiveTab(nextTab);
    if (nextTab === "users") loadUsers(orderField, isDescending, query);
    else loadTeams(orderField, isDescending, query);
  };

  const handleFieldChange = (next: string) => {
    const nextField = next as OrderField;
    setOrderField(nextField);
    loadBoth(nextField, isDescending, query);
  };

  const handleDirectionToggle = () => {
    const nextDesc = !isDescending;
    setIsDescending(nextDesc);
    loadBoth(orderField, nextDesc, query);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    if (activeTab === "users") loadUsers(orderField, isDescending, nextQuery);
    else loadTeams(orderField, isDescending, nextQuery);
  };

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4 select-none">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Trophy className="text-muted-foreground size-6" />
            {t(PLACEHOLDERS.TITLE_LEADERBOARD)}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {t(PLACEHOLDERS.DESCRIPTION_LEADERBOARD)}
          </p>
        </div>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex flex-1 flex-col gap-4"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="users" className="gap-1.5">
                <Users className="size-4" />
                {t(PLACEHOLDERS.TAB_USERS)}
              </TabsTrigger>
              <TabsTrigger value="teams" className="gap-1.5">
                <Trophy className="size-4" />
                {t(PLACEHOLDERS.TAB_TEAMS)}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Input
              placeholder={t(activeTab === "users" ? PLACEHOLDERS.LABEL_SEARCH_USERS : PLACEHOLDERS.LABEL_SEARCH_TEAMS)}
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
        </div>

        <TabsContent value="users" className={cn("flex flex-col gap-3", isPending && "opacity-60")}>
          {users.length === 0 ? (
            <Card className="text-muted-foreground flex items-center justify-center p-8 text-sm">
              {t(PLACEHOLDERS.LABEL_NO_USERS_YET)}
            </Card>
          ) : (
            users.map((user, index) => (
              <UserCard
                key={user.id}
                href={`${PAGES.PROFILE}/${user.usernames[0]}`}
                user={user}
                score={index + 1}
                metrics
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="teams" className={cn("flex flex-col gap-3", isPending && "opacity-60")}>
          {teams.length === 0 ? (
            <Card className="text-muted-foreground flex items-center justify-center p-8 text-sm">
              {t(PLACEHOLDERS.LABEL_NO_TEAMS_YET)}
            </Card>
          ) : (
            teams.map((team, index) => (
              <TeamCard
                key={team.id}
                href={`${PAGES.TEAMS}/${team.id}`}
                team={team}
                score={index + 1}
              />
            ))
          )}
        </TabsContent>

        {isPending && (
          <div className="text-muted-foreground pointer-events-none flex items-center justify-center gap-2 text-xs">
            <Loader2 className="size-4 animate-spin" />
          </div>
        )}
      </Tabs>
    </section>
  );
};
