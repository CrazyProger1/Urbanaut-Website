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
import { QUERIES } from "@/config";
import Link from "next/link";

type StyledToastArgs = {
  title: string;
  icon: React.ReactNode;
  className: string;
  onClick?: () => void;
  href?: string;
  options?: ExternalToast;
};

const showStyledToast = ({ title, icon, className, onClick, options, href }: StyledToastArgs) => {
  const overlay = href ? (
    <Link
      href={href}
      onClick={onClick}
      aria-label={title}
      className="absolute inset-0 z-10 cursor-pointer"
    />
  ) : (
    <div onClick={onClick} aria-label={title} className="absolute inset-0 z-10 cursor-pointer" />
  );

  toast(
    <>
      <span>{title}</span>
      {overlay}
    </>,
    {
      ...options,
      icon,
      classNames: {
        toast: cn(
          className,
          "backdrop-blur-md backdrop-brightness-50! shadow-volume!",
          onClick && "relative",
        ),
        title: "text-foreground! text-sm font-semibold!",
        description: "text-xs",
      },
      position: "top-right",
    },
  );
};

export const showNotificationToast = (notification: Notification, options?: ExternalToast) => {
  showStyledToast({
    title: notification.title,
    icon: getNotificationIcon(notification.type, getNotificationIconColorClass(notification.type)),
    className: getNotificationColorClass(notification.type),
    href: `?${QUERIES.MODAL_NOTIFICATION}=${notification.id}`,
    options: { ...options, description: notification.subtitle },
  });
};

export const showToast = (title: string, type: ToastType = "default", options?: ExternalToast) => {
  showStyledToast({
    title,
    icon: getToastIcon(type, getToastIconColorClass(type)),
    className: getToastColorClass(type),
    options,
  });
};
