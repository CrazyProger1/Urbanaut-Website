import React from "react";
import { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";

type Props = {
  user: User;
};

export const UserActivitySection = ({ user }: Props) => {
  return (
    <Tabs defaultValue="reports" className="flex flex-1 flex-col gap-4 select-none">
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
      <TabsContent value="friends" className="drop-shadow-volume flex flex-1 flex-col">
        <Card className="disabled flex flex-1 flex-col items-center justify-center p-4">
          <Lock size="64" />
        </Card>
      </TabsContent>
    </Tabs>
  );
};
