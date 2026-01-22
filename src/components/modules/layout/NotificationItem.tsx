import React from "react";
import { Notification as NotificationType } from "@/types";
import { getNotificationColorClass, getNotificationIconColorClass } from "@/utils/classes";
import { getNotificationIcon } from "@/utils/icons";

type Props = {
  notification: NotificationType;
};

export const NotificationItem = ({ notification }: Props) => {
  const { type, title, subtitle } = notification;

  return (
    <div
      className={`${getNotificationColorClass(type)} cursor-pointer border-l-4 px-4 py-3 transition-opacity last:border-b hover:opacity-80`}
    >
      <div className="flex flex-row items-center gap-3">
        <div>{getNotificationIcon(notification.type, getNotificationIconColorClass(type))}</div>
        <div>
          <p className="text-foreground text-sm font-semibold">{title}</p>
          {subtitle && <p className="text-muted-foreground text-xs">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};
