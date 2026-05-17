import Link from "next/link";
import { Users, Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGES, PLACEHOLDERS } from "@/config";
import React from "react";
import { useTranslations } from "next-intl";
import { APIListTeam, User } from "@/types";
import { TeamCard, UserCard } from "@/components/modules/common/cards";

type Props = {
  users: User[];
  teams?: APIListTeam[];
};

export const LeaderboardSection = ({ users, teams = [] }: Props) => {
  const t = useTranslations("Modules");
  return (
    <section className="mx-auto flex max-w-6xl flex-row gap-8 px-6 py-14">
      <div className="flex flex-1 flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t(PLACEHOLDERS.TITLE_TOP_EXPLORERS)}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {t(PLACEHOLDERS.DESCRIPTION_TOP_EXPLORERS)}
            </p>
          </div>
          <Trophy className="text-muted-foreground size-5" />
        </div>

        <div className="flex flex-col gap-4">
          {users.slice(0, 5).map((user) => (
            <UserCard
              key={user.id}
              href={`${PAGES.PROFILE}/${user.usernames[0]}`}
              user={user}
              metrics
            />
          ))}
        </div>
        {users.length > 5 && (
          <Button variant="ghost" size="sm" className="mt-3 self-start" asChild>
            <Link href={PAGES.LEADERBOARD}>
              {t(PLACEHOLDERS.BUTTON_VIEW_ALL)} <ChevronRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t(PLACEHOLDERS.TITLE_TOP_TEAMS)}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {t(PLACEHOLDERS.DESCRIPTION_TOP_TEAMS)}
            </p>
          </div>
          <Users className="text-muted-foreground size-5" />
        </div>

        <div className="flex flex-col gap-4">
          {teams.length === 0 ? (
            <div className="text-muted-foreground flex flex-1 items-center justify-center py-8 font-bold">
              {t(PLACEHOLDERS.LABEL_TEAM_COULD_BE_FIRST)}
            </div>
          ) : (
            teams
              .slice(0, 5)
              .map((team) => (
                <TeamCard key={team.id} href={`${PAGES.TEAMS}/${team.id}`} team={team} />
              ))
          )}
        </div>

        {teams.length > 5 && (
          <Button variant="ghost" size="sm" className="mt-3 self-start" asChild>
            <Link href={PAGES.TEAMS}>
              {t(PLACEHOLDERS.BUTTON_VIEW_ALL)} <ChevronRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};
