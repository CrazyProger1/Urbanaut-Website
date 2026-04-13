import React, { ReactNode } from "react";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CopyToast } from "@/components/common/toasts";
import { PAGES, PLACEHOLDERS, SITE_URL } from "@/config";
import { getRankShadowClass } from "@/utils/classes";

type Props = {
  user: User;
  href?: string;
  action?: ReactNode;
  role?: string;
};

export const UserCard = ({ user, href, action, role }: Props) => {
  return (
    <div className="bg-card text-card-foreground drop-shadow-volume relative flex w-full cursor-pointer flex-row items-center gap-2 rounded-2xl px-2 py-1 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
      {role && <div className="text-muted-foreground absolute top-1 right-2 text-xs">{role}</div>}
      <Avatar className="h-18 w-18 rounded-lg p-1">
        <AvatarImage
          className={getRankShadowClass(user?.rank)}
          src={"/web-app-manifest-192x192.png"}
          alt={user?.first_name}
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col leading-tight">
        <span className={`truncate font-bold ${getRankShadowClass(user?.rank)}`}>
          {user?.first_name} {user?.last_name}
        </span>
        <div className="text-muted-foreground flex flex-col text-sm">
          {user?.usernames?.map((username) => (
            <CopyToast key={username} clipboard={`${SITE_URL}${PAGES.PROFILE}/${username}`}>
              <div className="cursor-pointer select-none hover:underline" key={username}>
                @{username}
              </div>
            </CopyToast>
          ))}
        </div>
      </div>
      {action && <div className="flex w-full flex-row justify-end pr-2">{action}</div>}
    </div>
  );
};
