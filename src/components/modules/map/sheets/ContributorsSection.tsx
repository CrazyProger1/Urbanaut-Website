"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { UserCreator, UserEditor } from "@/types";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n";
import { PAGES, PLACEHOLDERS, SITE_URL } from "@/config";
import { getRankShadowClass } from "@/utils/classes";
import { CopyToast } from "@/components/common/toasts";
import { UserCard } from "@/components/modules/common/cards";

type Props = {
  creator?: UserCreator;
  editors?: UserEditor[];
};

export const ContributorsSection = ({ creator }: Props) => {
  const t = useTranslations("Modules");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <User />
        <div className="font-semibold">{t(PLACEHOLDERS.SECTION_CONTRIBUTORS)}</div>
      </div>
      <div>
        {creator && (
          <Link href={`${PAGES.PROFILE}/${creator?.usernames[0]}`}>
            <UserCard user={creator} role={t(PLACEHOLDERS.ROLE_CREATOR)}/>
          </Link>
        )}
      </div>
    </div>
  );
};
