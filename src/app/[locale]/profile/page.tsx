import { getSession } from "@/utils/session";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, LockKeyhole, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AchievementTable } from "@/components/modules/profile";
import { PAGES } from "@/config";
import { redirect } from "@/i18n";
import { getFormatter, getLocale } from "next-intl/server";
import { MetricsTable } from "@/components/modules/profile/tables";
import { getRankShadowClass } from "@/utils/css";

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const session = await getSession();

  const params = await searchParams;

  const tab = params?.tab || "reports";

  if (!session || !session?.user) {
    return redirect({ href: PAGES.MAIN, locale: await getLocale() });
  }

  const { user } = session;
  const rankClass = getRankShadowClass(user?.rank);

  const format = await getFormatter();

  const joinedAt = Date.parse(user.created_at);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="drop-shadow-volume flex flex-col items-center gap-4 p-4 lg:flex-row">
        <div className="flex min-w-64 flex-col items-center">
          <Image
            className={rankClass}
            src="/web-app-manifest-192x192.png"
            width={192}
            height={192}
            alt="Profile"
          />
          <Button variant="outline">
            <Edit />
            Edit Profile
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 py-4 text-center lg:items-start lg:text-left">
          <div className={`text-lg font-bold ${rankClass}`}>
            {user?.first_name} {user?.last_name}
          </div>
          <div className="text-muted-foreground flex flex-col text-sm">
            {user?.usernames?.map((username) => (
              <div key={username}>@{username}</div>
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
          <Card className="flex flex-col items-center">
            <LockKeyhole size="64" />
          </Card>
        </TabsContent>
        <TabsContent value="places" className="drop-shadow-volume">
          <Card className="flex flex-col items-center">
            <LockKeyhole size="64" />
          </Card>
        </TabsContent>
        <TabsContent value="achivements" className="drop-shadow-volume">
          <Card className="flex flex-col items-center">
            <LockKeyhole size="64" />
          </Card>
        </TabsContent>
        <TabsContent value="friends" className="drop-shadow-volume">
          <Card className="flex flex-col items-center">
            <LockKeyhole size="64" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
