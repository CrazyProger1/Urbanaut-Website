import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { UserNavBar } from "@/components/modules/layout/UserNavBar";
import { NotificationBar } from "@/components/modules/layout/NotificationBar";
import { ThemeToggle } from "@/components/modules/layout/ThemeToggle";
import { SessionUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n";
import { User } from "lucide-react";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { Notification } from "@/types";
import { Tooltip } from "@/components/ui/next/tooltip";

type Props = {
  user?: SessionUser;
  websocketToken?: string;
  notifications?: Notification[];
};

export const Header = ({ user, websocketToken, notifications }: Props) => {
  return (
    <header className="bg-background drop-shadow-volume sticky top-0 flex h-16 shrink-0 flex-row items-center justify-between gap-4 border-b px-4 select-none">
      <div className="flex items-center gap-2">
        <Tooltip content={PLACEHOLDERS.TOOLTIP_TOGGLE_SIDEBAR} asChild>
          <SidebarTrigger className="-ml-1" />
        </Tooltip>
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {websocketToken && (
          <NotificationBar websocketToken={websocketToken} notifications={notifications || []} />
        )}
        {/*<ThemeToggle />*/}

        {user ? (
          <UserNavBar user={user} />
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
