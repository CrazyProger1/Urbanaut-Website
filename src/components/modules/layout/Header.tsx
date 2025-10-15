import React from "react";
import { Link } from "@/i18n";

export const Header = () => {
  return (
    <div className="bg-background/50 flex max-h-48 flex-row items-center justify-between">
      <Link href="?auth=true">Auth</Link>
    </div>
  );
};
