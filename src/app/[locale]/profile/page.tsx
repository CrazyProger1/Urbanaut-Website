import { getSession } from "@/utils/session";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, LockKeyhole, MapPin, Pin, Shield, UserStar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GiGasMask } from "react-icons/gi";
import { LiaUserNinjaSolid } from "react-icons/lia";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = async () => {
  const session = await getSession();

  const metrics = [
    {
      value: 47,
      name: "Reports",
    },
    {
      value: 20,
      name: "Friends",
    },
    {
      value: 1,
      name: "Teams",
    },
    {
      value: 500,
      name: "Followers",
    },
    {
      value: 300,
      name: "Places",
    },
  ];

  const achievements = [
    {
      color: "bg-purple-500/10",
      icon: <GiGasMask />,
      name: "Urbanaut",
    },
    {
      color: "bg-red-500/10",
      icon: <UserStar />,
      name: "Moderator",
    },
    {
      color: "bg-yellow-500/10",
      icon: <Shield />,
      name: "Safety First",
    },
    {
      color: "bg-green-500/10",
      icon: <LiaUserNinjaSolid />,
      name: "Ninja",
    },
  ];
  return (
    <div className="flex flex-col gap-4 p-4">
      <Card className="drop-shadow-volume flex flex-row gap-4 p-4">
        <div className="flex min-w-64 flex-col items-center">
          <Image
            className="drop-shadow-[3px_3px_5px_rgba(157,0,255,0.5)]"
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
        <div className="flex flex-col gap-4 py-4">
          <div className="text-lg font-bold drop-shadow-[3px_3px_5px_rgba(157,0,255,0.5)]">
            {session?.user?.first_name} {session?.user?.last_name}
          </div>
          <div className="text-muted-foreground text-sm">
            <div>@urbanadventurer</div>
            <div>@urbanaut</div>
          </div>
          <div>
            Some Descriptiojn Some DescriptiojnSome DescriptiojnSome DescriptiojnSome
            DescriptiojnSome DescriptiojnSome DescriptiojnSome DescriptiojnSome DescriptiojnSome
            DescriptiojnSome
          </div>
          <div className="text-muted-foreground flex flex-row gap-4 text-sm font-medium">
            <div className="flex flex-row items-center gap-1">
              <Calendar size={16} />
              <div>Joined October 2025</div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <MapPin size={16} />
              <div>Ukraine</div>
            </div>
          </div>
          <div className="flex flex-row gap-8">
            {metrics.map((metric) => (
              <div className="flex flex-col items-center" key={metric.name}>
                <div className="text-lg font-medium">{metric.value}</div>
                <div className="text-muted-foreground text-sm font-medium">{metric.name}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement) => (
              <Badge
                variant="outline"
                key={achievement.name}
                className={"flex flex-row items-center " + achievement.color}
              >
                {achievement.icon}
                <div className="text-muted-foreground text-sm">{achievement.name}</div>
              </Badge>
            ))}
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
          <TabsTrigger value="saved" className="w-full">
            Saved
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
        <TabsContent value="saved" className="drop-shadow-volume">
          <Card className="flex flex-col items-center">
            <LockKeyhole size="64" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
