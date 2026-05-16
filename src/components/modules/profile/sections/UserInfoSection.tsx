import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AtSign, Calendar, Edit, MapPin, Settings, Share2, UserPlus, UsersRound } from "lucide-react";
import { Bar } from "@/components/modules/common/bars";
import { AchievementTable } from "@/components/modules/profile";
import { PAGES, PLACEHOLDERS, QUERIES, SITE_URL } from "@/config";
import { Link } from "@/i18n";
import { getFormatter, getTranslations } from "next-intl/server";
import { MetricsTable } from "@/components/modules/profile/tables";
import { getRankShadowClass } from "@/utils/classes";
import { CopyToast } from "@/components/common/toasts";
import { UserDetail } from "@/types";
import { Tooltip } from "@/components/ui/next/tooltip";

type Props = {
  user: UserDetail;
  me?: boolean;
};

export const UserInfoSection = async ({ user, me = false }: Props) => {
  const t = await getTranslations("Modules");
  const format = await getFormatter();

  const joinedAt = Date.parse(user.created_at);

  const { settings } = user;
  const { country } = settings;

  const rankClass = getRankShadowClass(user?.rank);
  return (
    <Card className="drop-shadow-volume flex flex-col items-center gap-4 p-4 select-none lg:flex-row lg:items-stretch">
      <div className="flex min-w-64 flex-col items-center gap-4">
        <Image
          className={rankClass}
          src="/web-app-manifest-192x192.png"
          width={192}
          height={192}
          alt="Profile"
        />
        <div className={`text-lg font-bold ${rankClass}`}>
          {user?.first_name} {user?.last_name}
        </div>
        {me && (
          <div className="flex flex-row gap-1 lg:mt-auto">
            <Tooltip content={t(PLACEHOLDERS.TOOLTIP_EDIT_PROFILE)}>
              <Button variant="outline" asChild>
                <Link href={`${PAGES.PROFILE}?${QUERIES.MODAL_EDIT_PROFILE}=true`}>
                  <Edit />
                </Link>
              </Button>
            </Tooltip>
            <Tooltip content={t(PLACEHOLDERS.TOOLTIP_OPEN_SETTINGS)}>
              <Button variant="outline" asChild>
                <Link href={`?${QUERIES.MODAL_SETTINGS}=true`}>
                  <Settings />
                </Link>
              </Button>
            </Tooltip>

            <CopyToast clipboard={`${SITE_URL}${PAGES.PROFILE}/${user.usernames?.[0]}`}>
              <Tooltip content={t(PLACEHOLDERS.TOOLTIP_SHARE_PROFILE)} asChild>
                <Button variant="outline">
                  <Share2 />
                </Button>
              </Tooltip>
            </CopyToast>

            <Tooltip content={t(PLACEHOLDERS.TOOLTIP_REFERRAL_PROGRAM)}>
              <Button variant="outline" asChild>
                <Link href={`${PAGES.PROFILE}?${QUERIES.MODAL_REFERRAL_PROFILE}=true`}>
                  <UserPlus />
                </Link>
              </Button>
            </Tooltip>

            <Tooltip content={t(PLACEHOLDERS.TOOLTIP_CREATE_TEAM)}>
              <Button variant="outline" asChild>
                <Link href={`${PAGES.PROFILE}?${QUERIES.MODAL_CREATE_TEAM}=true`}>
                  <UsersRound />
                </Link>
              </Button>
            </Tooltip>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:justify-between lg:text-left">
        <div className="select-text">{user?.bio}</div>
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <div className="flex flex-row flex-wrap gap-1">
            {user?.usernames?.map((username) => (
              <CopyToast key={username} clipboard={`${SITE_URL}${PAGES.PROFILE}/${username}`}>
                <Bar icon={<AtSign className="text-primary h-5 w-5" />}>{username}</Bar>
              </CopyToast>
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-1">
            <Bar
              icon={<Calendar className="text-primary h-5 w-5" />}
              tooltip={t(PLACEHOLDERS.LABEL_JOINED)}
            >
              {format.dateTime(joinedAt, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Bar>
            {country && (
              <Bar icon={<MapPin className="text-primary h-5 w-5" />}>{country.name}</Bar>
            )}
          </div>
          <MetricsTable user={user} />
          <AchievementTable user={user} />
        </div>
      </div>
    </Card>
  );
};
