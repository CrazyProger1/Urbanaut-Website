import React from "react";
import { UserCreator, UserEditor } from "@/types";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n";
import { PAGES, SITE_URL } from "@/config";
import { getRankShadowClass } from "@/utils/classes";
import { CopyToast } from "@/components/common/toasts";

type Props = {
  creator?: UserCreator;
  editors?: UserEditor[];
};

export const ContributorsSection = ({ creator }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <User />
        <div className="font-semibold">Contributors</div>
      </div>
      <div>
        {creator && (
          <Link
            href={`${PAGES.PROFILE}/${creator?.usernames[0]}`}
          >
            <div className="bg-card text-card-foreground drop-shadow-volume relative flex w-full flex-row items-center gap-2 rounded-2xl px-2 py-1 shadow-lg">
              <div className="text-muted-foreground absolute top-1 right-2 text-xs">creator</div>
              <Avatar className="h-16 w-16 rounded-lg">
                <AvatarImage
                  className={getRankShadowClass(creator?.rank)}
                  src={"/web-app-manifest-192x192.png"}
                  alt={creator?.first_name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight">
                <span className={`truncate font-bold ${getRankShadowClass(creator?.rank)}`}>
                  {creator?.first_name} {creator?.last_name}
                </span>
                <div className="text-muted-foreground flex flex-col text-sm">
                  {creator?.usernames?.map((username) => (
                    <CopyToast key={username} clipboard={`${SITE_URL}${PAGES.PROFILE}/${username}`}>
                      <div className="cursor-pointer select-none hover:underline" key={username}>
                        @{username}
                      </div>
                    </CopyToast>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
