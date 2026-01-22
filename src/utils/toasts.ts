import { toast, type ExternalToast } from "sonner";
import { Notification } from "@/types";
import { getNotificationIcon } from "@/utils/icons";
import { getNotificationColorClass, getNotificationIconColorClass } from "@/utils/classes";
import { cn } from "@/lib/utils";

export const showNotificationToast = (notification: Notification, options?: ExternalToast) => {
  toast(notification.title, {
    ...options,
    icon: getNotificationIcon(notification.type, getNotificationIconColorClass(notification.type)),
    classNames: {
      toast: cn(getNotificationColorClass(notification.type), "backdrop-blur-md shadow-volume"),
      title: "text-foreground text-sm font-semibold",
      description: "text-muted-foreground text-xs",
    },
    position: "top-right",
    description: notification.subtitle,
  });
};
