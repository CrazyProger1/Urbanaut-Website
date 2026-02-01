"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { NotificationItem } from "./NotificationItem";
import { Notification } from "@/types";
import { useListenNotifications } from "@/hooks";
import { playSound } from "@/utils/sound";
import { PLACEHOLDERS, SOUNDS } from "@/config";
import { showNotificationToast } from "@/utils/toasts";
import { Tooltip } from "@/components/ui/next/tooltip";

type Props = {
  notifications: Notification[];
  websocketToken: string;
};

export const NotificationBar = ({ websocketToken, notifications: defaultNotifications }: Props) => {
  const notifications = useListenNotifications(
    websocketToken,
    defaultNotifications,
    (notification) => {
      playSound(SOUNDS.NOTIFICATION);
      setHasNewNotification(true);
      showNotificationToast(notification);
    },
  );

  const [hasNewNotification, setHasNewNotification] = useState(false);

  return (
    <Popover onOpenChange={() => setHasNewNotification(false)}>
      <Tooltip content={PLACEHOLDERS.TOOLTIP_NOTIFICATIONS}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent relative transition-colors"
          >
            <Bell className="h-5 w-5" />
            {hasNewNotification && (
              <span className="bg-primary absolute top-1 right-1 h-2 w-2 rounded-full" />
            )}
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent className="w-80 rounded-none p-0">
        <div className="flex max-h-96 flex-col overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-muted-foreground p-4 text-center">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <NotificationItem notification={notification} key={notification.id} />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
