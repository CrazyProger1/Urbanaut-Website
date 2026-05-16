import { cn } from "@/lib/utils";
import { AlertTriangle, Bell, CheckCircle, Clock, Heart, Info, RefreshCw, Settings } from "lucide-react";
import { ToastType } from "@/utils/classes";

export const getNotificationIcon = (type: string, className: string) => {
  const actualClassName = cn("w-5 h-5", className);
  switch (type) {
    case "UPDATE":
      return <RefreshCw className={actualClassName} />;
    case "SUCCESS":
      return <CheckCircle className={actualClassName} />;
    case "REMINDER":
      return <Clock className={actualClassName} />;
    case "SYSTEM":
      return <Settings className={actualClassName} />;
    case "SOCIAL":
      return <Heart className={actualClassName} />;
    case "ALERT":
      return <AlertTriangle className={actualClassName} />;
    default:
      return <Bell className={actualClassName} />;
  }
};

export const getToastIcon = (type: ToastType, className: string) => {
  const actualClassName = cn("w-5 h-5", className);
  switch (type) {
    case "success":
      return <CheckCircle className={actualClassName} />;
    case "error":
      return <AlertTriangle className={actualClassName} />;
    case "warning":
      return <AlertTriangle className={actualClassName} />;
    case "info":
      return <Info className={actualClassName} />;
    case "default":
    default:
      return <Bell className={actualClassName} />;
  }
};
