"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { NotificationItem } from "./NotificationItem";
import { Notification } from "@/types";
import { useListenNotifications } from "@/hooks";

type Props = {
  notifications: Notification[];
  websocketToken: string;
};

export const NotificationBar = ({
  websocketToken,
  notifications: defaultNotifications,
}: Props) => {
  const notifications = useListenNotifications(websocketToken, defaultNotifications);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-accent relative transition-colors"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="bg-primary absolute top-1 right-1 h-2 w-2 rounded-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
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
