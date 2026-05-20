import React from "react";
import { UserDetail } from "@/types";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/next/tabs";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { useTranslations } from "next-intl";
import { TABS } from "@/config/nav";
import { TeamsTab } from "@/components/modules/profile/tabs";

type Props = {
  user: UserDetail;
};

export const UserActivitySection = ({ user }: Props) => {
  const t = useTranslations("Modules");
  return (
    <Tabs
      query={QUERIES.PROFILE_TAB}
      defaultValue="reports"
      className="flex flex-1 flex-col gap-4 select-none"
    >
      <TabsList className="w-full">
        <TabsTrigger value={TABS.PROFILE_EXPEDITIONS} className="w-full">
          {t(PLACEHOLDERS.LABEL_REPORTS)}
        </TabsTrigger>
        <TabsTrigger value={TABS.PROFILE_PLACES} className="w-full">
          {t(PLACEHOLDERS.LABEL_PLACES)}
        </TabsTrigger>
        <TabsTrigger value={TABS.PROFILE_FRIENDS} className="w-full">
          {t(PLACEHOLDERS.LABEL_FRIENDS)}
        </TabsTrigger>
        <TabsTrigger value={TABS.PROFILE_TEAMS} className="w-full">
          {t(PLACEHOLDERS.LABEL_TEAMS)}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reports" className="drop-shadow-volume flex flex-1 flex-col">
        <Card className="disabled flex flex-1 flex-col items-center justify-center p-4">
          <Lock size="64" />
        </Card>
      </TabsContent>
      <TabsContent value="places" className="drop-shadow-volume flex flex-1 flex-col">
        <Card className="disabled flex flex-1 flex-col items-center justify-center p-4">
          <Lock size="64" />
        </Card>
      </TabsContent>
      <TabsContent value="achivements" className="drop-shadow-volume flex flex-1 flex-col">
        <Card className="disabled flex flex-1 flex-col items-center justify-center p-4">
          <Lock size="64" />
        </Card>
      </TabsContent>
      <TabsContent value={TABS.PROFILE_TEAMS} className="drop-shadow-volume flex flex-1 flex-col">
        <TeamsTab />
      </TabsContent>
    </Tabs>
  );
};
