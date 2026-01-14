"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail } from "lucide-react";
import { SwitchToggle } from "@/components/common/toggles";

export const NotificationsSettingsSection = () => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNews, setEmailNews] = useState(false);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SwitchToggle
          title="Push notifications"
          description="Receive push notifications on your device"
          icon={<Bell className="size-4" />}
        />
        <SwitchToggle
          title="Email news"
          description=" Get the latest news and updates via email"
          icon={<Mail className="size-4" />}
        />
      </CardContent>
    </Card>
  );
};
