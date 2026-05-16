import React from "react";
import { toast, type ExternalToast } from "sonner";
import { Notification } from "@/types";
import { getNotificationIcon, getToastIcon } from "@/utils/icons";
import {
  getNotificationColorClass,
  getNotificationIconColorClass,
  getToastColorClass,
  getToastIconColorClass,
  ToastType,
} from "@/utils/classes";
import { cn } from "@/lib/utils";

const showStyledToast = (
  title: string,
  icon: React.ReactNode,
  className: string,
  options?: ExternalToast,
) => {
  toast(title, {
    ...options,
    icon,
    classNames: {
      toast: cn(className, "backdrop-blur-md backdrop-brightness-50! shadow-volume!"),
      title: "text-foreground! text-sm font-semibold!",
      description: "text-xs",
    },
    position: "top-right",
  });
};

export const showNotificationToast = (notification: Notification, options?: ExternalToast) => {
  showStyledToast(
    notification.title,
    getNotificationIcon(notification.type, getNotificationIconColorClass(notification.type)),
    getNotificationColorClass(notification.type),
    { ...options, description: notification.subtitle },
  );
};

export const showToast = (title: string, type: ToastType = "default", options?: ExternalToast) => {
  showStyledToast(
    title,
    getToastIcon(type, getToastIconColorClass(type)),
    getToastColorClass(type),
    options,
  );
};