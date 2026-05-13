import { useEffect, useMemo, useState } from "react";
import { Notification } from "@/types";
import useWebSocket from "react-use-websocket";
import { WEBSOCKET_URL } from "@/config";
import { syncCurrentUserVoid } from "@/actions";

const deduplicateNotifications = (notifications: Notification[]) => {
  const uniqueIds = new Set<number>();
  return notifications.filter((notification) => {
    if (uniqueIds.has(notification.id)) {
      return false;
    }

    uniqueIds.add(notification.id);
    return true;
  });
};

export const useListenNotifications = (
  websocketToken: string,
  defaultNotifications?: Notification[],
  onNotification?: (notification: Notification) => void,
) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (defaultNotifications) {
      setNotifications((prev) => deduplicateNotifications([...prev, ...defaultNotifications]));
    }
  }, [defaultNotifications]);

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
      const notification = data.data as Notification;
      setNotifications((prev) => [notification, ...prev]);
      onNotification?.(notification);

      if (["ALERT", "SUCCESS"].includes(notification.type)) {
        syncCurrentUserVoid();
      }
    }
  }, [lastMessage, readyState]);

  return useMemo(() => {
    return deduplicateNotifications(notifications);
  }, [notifications]);
};
