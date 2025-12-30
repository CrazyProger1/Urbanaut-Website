import { getSession } from "@/utils/session";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Link2, Lock, MapPin, Settings, Share2, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AchievementTable } from "@/components/modules/profile";
import { PAGES, QUERIES, SITE_URL } from "@/config";
import { Link, redirect } from "@/i18n";
import { getFormatter, getLocale } from "next-intl/server";
import { MetricsTable } from "@/components/modules/profile/tables";
import { getRankShadowClass } from "@/utils/css";
import { EditProfileModal, ReferralModal } from "@/components/modules/profile/modals";
import { CopyToast } from "@/components/common/toasts";

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const session = await getSession();

  const params = await searchParams;

  const tab = params?.tab || "reports";

  if (!session || !session?.user) {
    // TODO: move into middleware
    return redirect({ href: PAGES.MAIN, locale: await getLocale() });
  }

  const { user } = session;
  const rankClass = getRankShadowClass(user?.rank);

  const format = await getFormatter();

  const joinedAt = Date.parse(user.created_at);

  return (
    <div className="flex flex-col gap-4 p-4">
      <EditProfileModal user={user} />
      <ReferralModal />
      <Card className="drop-shadow-volume flex flex-col items-center gap-4 p-4 lg:flex-row">
        <div className="flex min-w-64 flex-col items-center">
          <Image
            className={rankClass}
            src="/web-app-manifest-192x192.png"
            width={192}
            height={192}
            alt="Profile"
          />
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
            <CopyToast clipboard="DSad">
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
          <div>{user?.bio}</div>
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
            <div className="flex flex-row items-center gap-1">
              <MapPin size={16} />
              <div>Ukraine</div>
            </div>
          </div>
          <div className="flex flex-row gap-8">
            <MetricsTable user={user} />
          </div>
          <div className="flex flex-wrap gap-2">
            <AchievementTable user={user} />
          </div>
        </div>
      </Card>
      <Tabs defaultValue="reports" className="flex flex-col gap-4">
        <TabsList className="w-full">
          <TabsTrigger value="reports" className="w-full">
            Reports
          </TabsTrigger>
          <TabsTrigger value="places" className="w-full">
            Places
          </TabsTrigger>
          <TabsTrigger value="achivements" className="w-full">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="friends" className="w-full">
            Friends
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reports" className="drop-shadow-volume">
          <Card className="disabled flex flex-col items-center">
            <Lock size="64" />
          </Card>
        </TabsContent>
        <TabsContent value="places" className="drop-shadow-volume">
          <Card className="disabled flex flex-col items-center">
            <Lock size="64" />
          </Card>
        </TabsContent>
        <TabsContent value="achivements" className="drop-shadow-volume">
          <Card className="disabled flex flex-col items-center">
            <Lock size="64" />
          </Card>
        </TabsContent>
        <TabsContent value="friends" className="drop-shadow-volume">
          <Card className="disabled flex flex-col items-center">
            <Lock size="64" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
