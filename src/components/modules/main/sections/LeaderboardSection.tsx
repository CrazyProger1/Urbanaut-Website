import Link from "next/link";
import { Users, Trophy, Zap, Heart, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PAGES, SITE_URL } from "@/config";
import { getRankShadowClass } from "@/utils/classes";
import { CopyToast } from "@/components/common/toasts";
import React from "react";
import { useTranslations } from "next-intl";
import { User } from "@/types";
import { shortifyNumber } from "@/utils/string";



type Props = {
  users: User[];
};

export const LeaderboardSection = ({ users }: Props) => {
  const t = useTranslations("Modules");
  return (
    <section className="mx-auto flex max-w-6xl flex-row gap-8 px-6 py-14">
      <div className="flex flex-1 flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t("TITLE_TOP_EXPLORERS")}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{t("DESCRIPTION_TOP_EXPLORERS")}</p>
          </div>
          <Trophy className="text-muted-foreground size-5" />
        </div>

        <div className="flex flex-col gap-4">
          {users.slice(0, 5).map((user) => (
            <Link href={`${PAGES.PROFILE}/${user?.usernames[0]}`} key={user.id}>
              <div className="bg-card text-card-foreground drop-shadow-volume relative flex w-full flex-row items-center gap-2 rounded-2xl px-2 py-1 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage
                    className={getRankShadowClass(user?.rank)}
                    src={"/web-app-manifest-192x192.png"}
                    alt={user?.first_name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <span className={`truncate font-bold ${getRankShadowClass(user?.rank)}`}>
                    {user?.first_name} {user?.last_name}
                  </span>
                  <div className="text-muted-foreground flex flex-col text-sm">
                    {user?.usernames?.map((username) => (
                      <CopyToast
                        key={username}
                        clipboard={`${SITE_URL}${PAGES.PROFILE}/${username}`}
                      >
                        <div className="cursor-pointer select-none hover:underline" key={username}>
                          @{username}
                        </div>
                      </CopyToast>
                    ))}
                  </div>
                </div>
                <div className="text-muted-foreground ml-auto flex flex-col items-start gap-1 pr-2 text-xs">
                  <span className="flex items-center gap-1">
                    <Zap className="size-3" />
                    {shortifyNumber(user?.experience || 0)} exp
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="size-3" />
                    {shortifyNumber(user?.karma || 0)} kar
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="mt-3 self-start" asChild>
          <Link href="/leaderboard">
            {t("BUTTON_VIEW_ALL")} <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t("TITLE_TOP_TEAMS")}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{t("DESCRIPTION_TOP_TEAMS")}</p>
          </div>
          <Users className="text-muted-foreground size-5" />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div className="text-muted-foreground">{t("LABEL_TEAM_COULD_BE_FIRST")}</div>

          {/*{MOCK_TEAMS.map((team) => (*/}
          {/*  <Link href={`/teams/${team.handle}`} key={team.id}>*/}
          {/*    <div className="bg-card text-card-foreground drop-shadow-volume relative flex w-full flex-row items-center gap-2 rounded-2xl px-2 py-1 shadow-lg transition-transform duration-200 hover:scale-[1.02]">*/}
          {/*      <Avatar className="h-16 w-16 rounded-lg">*/}
          {/*        <AvatarFallback className="rounded-lg text-xs font-bold">*/}
          {/*          {team.name.slice(0, 2).toUpperCase()}*/}
          {/*        </AvatarFallback>*/}
          {/*      </Avatar>*/}
          {/*      <div className="flex flex-col leading-tight">*/}
          {/*        <span className="truncate font-bold">{team.name}</span>*/}
          {/*        <span className="text-muted-foreground text-sm">@{team.handle}</span>*/}
          {/*        <span className="text-muted-foreground flex items-center gap-1 text-xs">*/}
          {/*          <Users className="size-3" />*/}
          {/*          {team.members} {t("LABEL_MEMBERS")}*/}
          {/*        </span>*/}
          {/*      </div>*/}
          {/*      <div className="text-muted-foreground ml-auto flex flex-col items-start gap-1 pr-2 text-xs">*/}
          {/*        <span className="flex items-center gap-1">*/}
          {/*          <Zap className="size-3" />*/}
          {/*          {shortNum(team.exp)} exp*/}
          {/*        </span>*/}
          {/*        <span className="flex items-center gap-1">*/}
          {/*          <Heart className="size-3" />*/}
          {/*          {shortNum(team.karma)} kar*/}
          {/*        </span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*))}*/}
        </div>
        {/*<Button variant="ghost" size="sm" className="mt-3 self-start" asChild>*/}
        {/*  <Link href="/teams">*/}
        {/*    {t("BUTTON_VIEW_ALL")} <ChevronRight className="size-4" />*/}
        {/*  </Link>*/}
        {/*</Button>*/}
      </div>
    </section>
  );
};
