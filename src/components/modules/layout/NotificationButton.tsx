"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NotificationButton = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative transition-colors hover:bg-accent"
      title="Notifications"
    >
      <Bell className="h-5 w-5" />
      <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
    </Button>
  );
};