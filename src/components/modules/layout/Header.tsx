import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { UserNavBar } from "@/components/modules/layout/UserNavBar";
import { SessionUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n";
import { User } from "lucide-react";


type Props = {
  user?: SessionUser;
}

export const Header = ({ user }: Props) => {
  return (
    <header
      className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between flex-row">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <div>
        {user ? <UserNavBar
          user={{
            name: "Urbanaut",
            email: user?.email || "urbanautdev@gmail.com",
            avatar: "/web-app-manifest-192x192.png",
          }} /> : <Button asChild><Link href="?auth=true">
          <User />Login
        </Link></Button>}
      </div>

    </header>
  );
};
