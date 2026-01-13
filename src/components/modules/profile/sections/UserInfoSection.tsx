import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, MapPin, Settings, Share2, Users } from "lucide-react";
import { AchievementTable } from "@/components/modules/profile";
import { PAGES, QUERIES, SITE_URL } from "@/config";
import { Link } from "@/i18n";
import { getFormatter } from "next-intl/server";
import { MetricsTable } from "@/components/modules/profile/tables";
import { getRankShadowClass } from "@/utils/css";
import { CopyToast } from "@/components/common/toasts";
import { User } from "@/types";

type Props = {
  user: User;
  me?: boolean;
};

export const UserInfoSection = async ({ user, me = false }: Props) => {
  const format = await getFormatter();

  const joinedAt = Date.parse(user.created_at);

  const { settings } = user;
  const { country } = settings;

  const rankClass = getRankShadowClass(user?.rank);
  return (
    <Card className="drop-shadow-volume flex flex-col items-center gap-4 p-4 select-none lg:flex-row">
      <div className="flex min-w-64 flex-col items-center">
        <Image
          className={rankClass}
          src="/web-app-manifest-192x192.png"
          width={192}
          height={192}
          alt="Profile"
        />
        {me && (
          <div className="flex flex-row gap-1">
            <Button variant="outline" asChild>
              <Link href={`${PAGES.PROFILE}?${QUERIES.EDIT_PROFILE_MODAL}=true`}>
                <Edit />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={PAGES.SETTINGS}>
                <Settings />
              </Link>
            </Button>
            <CopyToast clipboard={`${SITE_URL}${PAGES.PROFILE}/${user.usernames?.[0]}`}>
              <Button variant="outline">
                <Share2 />
              </Button>
            </CopyToast>
            <Button variant="outline" asChild>
              <Link href={`${PAGES.PROFILE}?${QUERIES.REFERRAL_PROFILE_MODAL}=true`}>
                <Users />
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 py-4 text-center lg:items-start lg:text-left">
        <div className={`text-lg font-bold ${rankClass}`}>
          {user?.first_name} {user?.last_name}
        </div>
        <div className="text-muted-foreground flex flex-col text-sm">
          {user?.usernames?.map((username) => (
            <CopyToast key={username} clipboard={`${SITE_URL}${PAGES.PROFILE}/${username}`}>
              <div className="cursor-pointer select-none hover:underline" key={username}>
                @{username}
              </div>
            </CopyToast>
          ))}
        </div>
        <div className="select-text">{user?.bio}</div>
        <div className="text-muted-foreground flex flex-row gap-4 text-sm font-medium">
          <div className="flex flex-row items-center gap-1">
            <Calendar size={16} />
            <div>
              Joined{" "}
              {format.dateTime(joinedAt, {
                year: "numeric",
                month: "long",
              })}
            </div>
          </div>
          {country && (
            <div className="flex flex-row items-center gap-1">
              <MapPin size={16} />
              <div>{country.name}</div>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-8">
          <MetricsTable user={user} />
        </div>
        <div className="flex flex-wrap gap-2">
          <AchievementTable user={user} />
        </div>
      </div>
    </Card>
  );
};
