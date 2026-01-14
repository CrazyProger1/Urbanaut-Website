"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail } from "lucide-react";

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
        <div className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-sm">Push notifications</p>
              <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
            </div>
          </div>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-sm">Email news</p>
              <p className="text-xs text-muted-foreground">Get the latest news and updates via email</p>
            </div>
          </div>
          <Switch
            id="email-news"
            checked={emailNews}
            onCheckedChange={setEmailNews}
          />
        </div>
      </CardContent>
    </Card>
  );
};
