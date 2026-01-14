"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="transition-colors hover:bg-accent"
      title="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform hover:rotate-90" />
      ) : (
        <Moon className="h-5 w-5 transition-transform hover:rotate-90" />
      )}
    </Button>
  );
};