import React from "react";
import { APIListTeam } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  team: APIListTeam;
};

export const TeamCard = ({ team }: Props) => {
  const t = useTranslations("Modules");
  const initials = team.name.slice(0, 2).toUpperCase();

  return (
    <div className="bg-card text-card-foreground drop-shadow-volume relative flex w-full cursor-pointer flex-row items-center gap-2 rounded-2xl px-2 py-1 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
      <Avatar className="h-18 w-18 rounded-lg p-1">
        <AvatarFallback className="rounded-lg text-sm font-bold">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col leading-tight">
        <span className="truncate font-bold">{team.name}</span>
        {team.motto && (
          <span className="text-muted-foreground truncate text-sm italic">{team.motto}</span>
        )}
        {team.members_count !== undefined && (
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <Users className="size-3" />
            {team.members_count} {t("LABEL_MEMBERS")}
          </span>
        )}
      </div>
    </div>
  );
};