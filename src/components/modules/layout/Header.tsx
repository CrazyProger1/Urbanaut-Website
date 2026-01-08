import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { UserNavBar } from "@/components/modules/layout/UserNavBar";
import { SessionUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n";
import { User } from "lucide-react";
import { QUERIES } from "@/config";

type Props = {
  user?: SessionUser;
};

export const Header = ({ user }: Props) => {
  return (
    <header className="bg-background drop-shadow-volume sticky top-0 flex h-16 shrink-0 flex-row items-center justify-between gap-2 border-b px-4 select-none">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      <div>
        {user ? (
          <UserNavBar
            user={{
              name: `${user?.first_name ? user.first_name : ""}${user?.last_name ? " " + user.last_name : ""}`,
              email: user?.email || "urbanautdev@gmail.com",
              avatar: "/web-app-manifest-192x192.png",
            }}
          />
        ) : (
          <Button asChild>
            <Link href={`?${QUERIES.SIGNIN_MODAL}=true`}>
              <User />
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};
