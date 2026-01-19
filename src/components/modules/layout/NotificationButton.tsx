"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  RefreshCw,
  Clock,
  Settings,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useWebSocket from "react-use-websocket";
import { WEBSOCKET_URL } from "@/config";
import { Notification } from "@/types";

type Props = {
  websocketToken: string;
};

const getNotificationStyle = (type: string) => {
  switch (type) {
    case "UPDATE":
      return {
        bgColor: "bg-blue-50 dark:bg-blue-950",
        iconColor: "text-blue-600 dark:text-blue-400",
        borderColor: "border-blue-200 dark:border-blue-800",
      };
    case "REMINDER":
      return {
        bgColor: "bg-purple-50 dark:bg-purple-950",
        iconColor: "text-purple-600 dark:text-purple-400",
        borderColor: "border-purple-200 dark:border-purple-800",
      };
    case "SYSTEM":
      return {
        bgColor: "bg-gray-50 dark:bg-gray-900",
        iconColor: "text-gray-600 dark:text-gray-400",
        borderColor: "border-gray-200 dark:border-gray-800",
      };
    case "SOCIAL":
      return {
        bgColor: "bg-pink-50 dark:bg-pink-950",
        iconColor: "text-pink-600 dark:text-pink-400",
        borderColor: "border-pink-200 dark:border-pink-800",
      };
    case "ALERT":
      return {
        bgColor: "bg-red-50 dark:bg-red-950",
        iconColor: "text-red-600 dark:text-red-400",
        borderColor: "border-red-200 dark:border-red-800",
      };
    default:
      return {
        bgColor: "bg-amber-50 dark:bg-amber-950",
        iconColor: "text-amber-600 dark:text-amber-400",
        borderColor: "border-amber-200 dark:border-amber-800",
      };
  }
};

const getNotificationIcon = (type: string, color: string) => {
  const iconProps = { className: `h-5 w-5 ${color}` };
  switch (type) {
    case "UPDATE":
      return <RefreshCw {...iconProps} />;
    case "REMINDER":
      return <Clock {...iconProps} />;
    case "SYSTEM":
      return <Settings {...iconProps} />;
    case "SOCIAL":
      return <Heart {...iconProps} />;
    case "ALERT":
      return <AlertTriangle {...iconProps} />;
    default:
      return <Bell {...iconProps} />;
  }
};

export const NotificationButton = ({ websocketToken }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
      setNotifications((prev) => [...prev, data.data as Notification]);
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
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification, idx) => {
              const style = getNotificationStyle(notification.type);
              return (
                <div
                  key={idx}
                  className={`${style.bgColor} border-l-4 ${style.borderColor} px-4 py-3 hover:opacity-80 transition-opacity cursor-pointer ${
                    idx !== notifications.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type, style.iconColor)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground leading-tight">
                        {notification.title}
                      </p>
                      {notification.content && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
