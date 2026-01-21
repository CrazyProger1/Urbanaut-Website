import React from "react";
import { Notification as NotificationType } from "@/types";
import { getNotificationColorClass, getNotificationIconColorClass } from "@/utils/classes";
import { getNotificationIcon } from "@/utils/icons";

type Props = {
  notification: NotificationType;
};

export const NotificationItem = ({ notification }: Props) => {
  const { type, content, title } = notification;

  return (
    <div
      className={`${getNotificationColorClass(type)} cursor-pointer border-l-4 px-4 py-3 transition-opacity last:border-b hover:opacity-80`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {getNotificationIcon(notification.type, getNotificationIconColorClass(type))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm leading-tight font-semibold">{title}</p>
          {content && <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{content}</p>}
        </div>
      </div>
    </div>
  );
};
