import { toast, type ExternalToast } from "sonner";
import { Notification, APINotificationType } from "@/types";
import { getNotificationIcon } from "@/utils/icons";
import { getNotificationColorClass, getNotificationIconColorClass } from "@/utils/classes";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info" | "default";

const TYPE_MAP: Record<ToastType, APINotificationType> = {
  success: "SUCCESS",
  error: "ALERT",
  warning: "REMINDER",
  info: "UPDATE",
  default: "SYSTEM",
};

const showTypedToast = (type: APINotificationType, title: string, options?: ExternalToast) => {
  toast(title, {
    ...options,
    icon: getNotificationIcon(type, getNotificationIconColorClass(type)),
    classNames: {
      toast: cn(
        getNotificationColorClass(type),
        "backdrop-blur-md backdrop-brightness-50! shadow-volume!",
      ),
      title: "text-foreground! text-sm font-semibold!",
      description: "text-xs",
    },
    position: "top-right",
  });
};

export const showNotificationToast = (notification: Notification, options?: ExternalToast) => {
  showTypedToast(notification.type, notification.title, {
    ...options,
    description: notification.subtitle,
  });
};

export const showToast = (title: string, type: ToastType = "default", options?: ExternalToast) => {
  showTypedToast(TYPE_MAP[type], title, options);
};