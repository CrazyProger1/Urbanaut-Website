import { useEffect, useMemo, useState } from "react";
import { Notification } from "@/types";
import useWebSocket from "react-use-websocket";
import { SOUNDS, WEBSOCKET_URL } from "@/config";
import { playSound } from "@/utils/sound";

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

  console.log("Using websocket URL:", WEBSOCKET_URL);

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
      setNotifications((prev) => [data.data as Notification, ...prev]);
      onNotification?.(data.data as Notification);
    }
  }, [lastMessage, readyState]);

  return useMemo(() => {
    return deduplicateNotifications(notifications);
  }, [notifications]);
};
