import { cn } from "@/lib/utils";
import { AlertTriangle, Bell, CheckCircle, Clock, Heart, RefreshCw, Settings } from "lucide-react";

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
