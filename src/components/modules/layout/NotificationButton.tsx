"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useWebSocket from "react-use-websocket";
import { WEBSOCKET_URL } from "@/config";

type Props = {
  websocketToken: string;
};

export const NotificationButton = ({ websocketToken }: Props) => {
  const [notifications, setNotifications] = useState<string[]>([]);

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
      setNotifications((prev) => [...prev, data.data.title]);
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
      <PopoverContent className="w-80">
        {notifications.map((notification) => (
          <div>{notification}</div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
