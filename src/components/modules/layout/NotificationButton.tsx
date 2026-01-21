"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useWebSocket from "react-use-websocket";
import { WEBSOCKET_URL } from "@/config";
import { NotificationItem } from "./NotificationItem";
import { Notification } from "@/types";

type Props = {
  notifications: Notification[];
  websocketToken: string;
};

export const NotificationButton = ({
  websocketToken,
  notifications: defaultNotifications,
}: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);

  const { lastMessage, readyState } = useWebSocket(
    WEBSOCKET_URL.replace("[token]", websocketToken),
    {
      share: true,
    },
  );

  useEffect(() => {
    if (!readyState || !lastMessage) return;
    const data = JSON.parse(lastMessage?.data);
    if (data.type === "notification") {
      setNotifications((prev) => [data.data as Notification, ...prev]);
    }
  }, [lastMessage, readyState]);

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
