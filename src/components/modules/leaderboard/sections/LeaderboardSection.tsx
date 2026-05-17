"use client";

import React, { useState, useTransition } from "react";
import { Loader2, Trophy, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { TeamCard, UserCard } from "@/components/modules/common/cards";
import { APIListTeam, User } from "@/types";
import { getTeams, getUsers } from "@/services";
import { PAGES, PLACEHOLDERS } from "@/config";
import { cn } from "@/lib/utils";

type LeaderboardOrdering = "-experience" | "-karma" | "-score";

type LeaderboardTab = "users" | "teams";

type Props = {
  initialUsers: User[];
  initialTeams: APIListTeam[];
  initialOrdering: LeaderboardOrdering;
};

const ORDERINGS: LeaderboardOrdering[] = ["-experience", "-karma", "-score"];

const orderingLabel: Record<LeaderboardOrdering, string> = {
  "-experience": PLACEHOLDERS.LABEL_ORDER_BY_EXPERIENCE,
  "-karma": PLACEHOLDERS.LABEL_ORDER_BY_KARMA,
  "-score": PLACEHOLDERS.LABEL_ORDER_BY_SCORE,
};

export const LeaderboardSection = ({ initialUsers, initialTeams, initialOrdering }: Props) => {
  const t = useTranslations("Modules");
  const [users, setUsers] = useState(initialUsers);
  const [teams, setTeams] = useState(initialTeams);
  const [ordering, setOrdering] = useState<LeaderboardOrdering>(initialOrdering);
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("users");
  const [isPending, startTransition] = useTransition();

  const handleOrderingChange = (next: string) => {
    const nextOrdering = next as LeaderboardOrdering;
    setOrdering(nextOrdering);
    startTransition(async () => {
      const [usersResponse, teamsResponse] = await Promise.all([
        getUsers({ ordering: nextOrdering }),
        getTeams({ ordering: nextOrdering }),
      ]);
      if (usersResponse.success) setUsers(usersResponse.results);
      if (teamsResponse.success) setTeams(teamsResponse.results);
    });
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
        onValueChange={(value) => setActiveTab(value as LeaderboardTab)}
        className="flex flex-1 flex-col gap-4"
      >
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

          <Tabs value={ordering} onValueChange={handleOrderingChange}>
            <TabsList>
              {ORDERINGS.map((value) => (
                <TabsTrigger key={value} value={value}>
                  {t(orderingLabel[value])}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
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
