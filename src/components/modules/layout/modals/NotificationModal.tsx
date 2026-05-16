"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormatter } from "next-intl";
import { Calendar } from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { Notification } from "@/types";
import { getNotification } from "@/services/api/notifications";
import { getNotificationColorClass, getNotificationIconColorClass } from "@/utils/classes";
import { getNotificationIcon } from "@/utils/icons";

export const NotificationModal = () => {
  const searchParams = useSearchParams();
  const formatter = useFormatter();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [colorClass, setColorClass] = useState<string>("");
  const [iconColorClass, setIconColorClass] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const notificationId = searchParams.get(QUERIES.MODAL_NOTIFICATION);

    if (notificationId) {
      getNotification(notificationId).then((result) => {
        if (result.success) {
          setNotification(result);
          setColorClass(getNotificationColorClass(result.type));
          setIconColorClass(getNotificationIconColorClass(result.type));
          console.log(result);
          setFormattedDate(
            formatter.dateTime(new Date(result.triggered_at), {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          );
        } else {
          setNotification(null);
        }
      });
    } else {
      setNotification(null);
    }
  }, [searchParams, formatter]);

  return (
    <Modal visible={!!notification} query={QUERIES.MODAL_NOTIFICATION}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-sm">
        <div className={`${colorClass} flex items-center justify-center border-b-4 px-6 py-10`}>
          {notification && getNotificationIcon(notification.type, `h-12 w-12 ${iconColorClass}`)}
        </div>
        <DialogHeader className="px-6 pt-4 pb-2">
          <DialogTitle className="text-center">{notification?.title}</DialogTitle>
          {notification?.subtitle && (
            <DialogDescription className="text-center">{notification.subtitle}</DialogDescription>
          )}
        </DialogHeader>
        <div className="text-muted-foreground flex flex-row items-center justify-center gap-1 px-6 text-xs">
          <Calendar className="size-4" />
          <div>{formattedDate}</div>
        </div>
        {notification?.content && (
          <p className="text-muted-foreground px-6 pt-2 pb-6 text-center text-sm leading-relaxed">
            {notification.content}
          </p>
        )}
        {!notification?.content && <div className="pb-4" />}
      </DialogContent>
    </Modal>
  );
};
