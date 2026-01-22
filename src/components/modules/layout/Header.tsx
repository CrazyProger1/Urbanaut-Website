import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { UserNavBar } from "@/components/modules/layout/UserNavBar";
import { NotificationBar } from "@/components/modules/layout/NotificationBar";
import { ThemeToggle } from "@/components/modules/layout/ThemeToggle";
import { SessionUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n";
import { User } from "lucide-react";
import { QUERIES } from "@/config";
import { Notification } from "@/types";

type Props = {
  user?: SessionUser;
  websocketToken?: string;
  notifications?: Notification[];
};

export const Header = ({ user, websocketToken, notifications }: Props) => {
  return (
    <header className="bg-background drop-shadow-volume sticky top-0 flex h-16 shrink-0 flex-row items-center justify-between gap-4 border-b px-4 select-none">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {websocketToken && (
          <NotificationBar websocketToken={websocketToken} notifications={notifications || []} />
        )}
        {/*<ThemeToggle />*/}

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
              <User className="h-4 w-4" />
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};
