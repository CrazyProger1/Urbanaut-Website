"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DateBar } from "@/components/modules/common/bars";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { Notification } from "@/types";
import { getNotification } from "@/services/api/notifications";
import { getNotificationColorClass, getNotificationIconColorClass } from "@/utils/classes";
import { getNotificationIcon } from "@/utils/icons";

export const NotificationModal = () => {
  const searchParams = useSearchParams();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [colorClass, setColorClass] = useState<string>("");
  const [iconColorClass, setIconColorClass] = useState<string>("");

  useEffect(() => {
    const notificationId = searchParams.get(QUERIES.MODAL_NOTIFICATION);

    if (notificationId) {
      getNotification(notificationId).then((result) => {
        if (result.success) {
          setNotification(result);
          setColorClass(getNotificationColorClass(result.type));
          setIconColorClass(getNotificationIconColorClass(result.type));
        } else {
          setNotification(null);
        }
      });
    } else {
      setNotification(null);
    }
  }, [searchParams]);

  return (
    <Modal visible={!!notification} query={QUERIES.MODAL_NOTIFICATION}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-sm">
        <div
          className={`${colorClass} flex cursor-pointer items-center justify-center border-b-4 px-6 py-10 transition-colors`}
        >
          {notification && getNotificationIcon(notification.type, `h-12 w-12 ${iconColorClass}`)}
        </div>
        <DialogHeader className="px-6 pt-4 pb-2">
          <DialogTitle className="text-center">{notification?.title}</DialogTitle>
          {notification?.subtitle && (
            <DialogDescription className="text-center">{notification.subtitle}</DialogDescription>
          )}
        </DialogHeader>
        {notification?.content && (
          <p className="text-foreground px-6 pt-2 text-sm leading-relaxed">
            {notification.content}
          </p>
        )}
        <div className="flex justify-center gap-2 px-6 pb-6 pt-2">
          {notification && <DateBar date={new Date(notification.triggered_at)} />}
        </div>
      </DialogContent>
    </Modal>
  );
};