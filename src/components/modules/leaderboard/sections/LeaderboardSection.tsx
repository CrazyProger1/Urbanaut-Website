"use client";

import React from "react";
import { Trophy, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { TeamCard, UserCard } from "@/components/modules/common/cards";
import { User, Team } from "@/types";

import { PAGES, PLACEHOLDERS, QUERIES } from "@/config";
import { OrderingControl } from "@/components/common/controls";
import { Tabs } from "@/components/ui/next/tabs";
import { Input } from "@/components/ui/next/input";
import { TABS } from "@/config/nav";

type Props = {
  tab?: string;
  ordering?: string;
  users: User[];
  teams: Team[];
};

export const LeaderboardSection = ({ tab, ordering, users, teams }: Props) => {
  const t = useTranslations("Modules");

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

      <Tabs defaultValue={tab} query={QUERIES.LEADERBOARD_TAB}>
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
              query={QUERIES.LEADERBOARD_SEARCH}
              placeholder={t(
                tab === TABS.LEADERBOARD_TEAMS
                  ? PLACEHOLDERS.LABEL_SEARCH_TEAMS
                  : PLACEHOLDERS.LABEL_SEARCH_USERS,
              )}
              className="sm:max-w-xs"
            />
            <OrderingControl
              query={QUERIES.LEADERBOARD_ORDERING}
              defaultOrdering={ordering}
              columns={[
                {
                  name: t(PLACEHOLDERS.LABEL_ORDER_BY_KARMA),
                  key: "karma",
                },
                {
                  name: t(PLACEHOLDERS.LABEL_ORDER_BY_EXPERIENCE),
                  key: "experience",
                },
                {
                  name: t(PLACEHOLDERS.LABEL_ORDER_BY_SCORE),
                  key: "score",
                },
              ]}
            />
          </div>
        </div>

        <TabsContent value={TABS.LEADERBOARD_USERS} className="flex flex-col gap-3">
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

        <TabsContent value={TABS.LEADERBOARD_TEAMS} className="flex flex-col gap-3">
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
      </Tabs>
    </section>
  );
};
