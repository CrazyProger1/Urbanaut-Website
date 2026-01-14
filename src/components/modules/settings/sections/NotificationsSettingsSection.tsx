"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail } from "lucide-react";
import { SwitchToggle } from "@/components/common/toggles";
import { switchEmailNews, switchPushNotifications } from "@/actions";
import { CurrentUser } from "@/types";

type Props = {
  user: CurrentUser;
};

export const NotificationsSettingsSection = ({ user }: Props) => {
  const [pushNotifications, setPushNotifications] = useState(
    user.settings.is_notifications_enabled,
  );
  const [emailNews, setEmailNews] = useState(false);

  const handlePushNotificationsChecked = async (checked: boolean) => {
    setPushNotifications((prev) => !prev);
    await switchPushNotifications(checked);
  };

  const handleEmailChecked = async (checked: boolean) => {
    setEmailNews((prev) => !prev);
    await switchEmailNews(checked);
  };

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
          icon={<Bell className="h-4 w-4" />}
          checked={pushNotifications}
          onCheckedChange={handlePushNotificationsChecked}
        />
        <SwitchToggle
          title="Email news"
          description=" Get the latest news and updates via email"
          icon={<Mail className="h-4 w-4" />}
          checked={emailNews}
          onCheckedChange={handleEmailChecked}
        />
      </CardContent>
    </Card>
  );
};
