"use client";

import { Bell, ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Link } from "@/i18n";
import { ALTS, IMAGES, PAGES, QUERIES, STUBS } from "@/config";
import { logout } from "@/actions";
import { getRankShadowClass } from "@/utils/classes";
import { cn } from "@/lib/utils";
import { CurrentUser } from "@/types";
import { getUserFullName } from "@/utils/user";
import { logoutOneSignal } from "@/services/lib/onesignal";

type Props = {
  user: CurrentUser;
};

export const UserNavBar = ({ user }: Props) => {
  const { isMobile } = useSidebar();
  const rankClass = getRankShadowClass(user?.rank);
  const avatarClass = cn(rankClass, "h-8 w-8 rounded-lg");
  const fullName = getUserFullName(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground select-none"
        >
          <Avatar className={avatarClass}>
            <AvatarImage src={STUBS.USER_AVATAR} alt={ALTS.USER_AVATAR} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{fullName}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg select-none"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={STUBS.USER_AVATAR} alt={ALTS.USER_AVATAR} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{fullName}</span>
              <span className="truncate text-xs select-all">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={PAGES.PROFILE}>
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href={`?${QUERIES.SETTINGS_MODAL}=true`}>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout();
            await logoutOneSignal();
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
