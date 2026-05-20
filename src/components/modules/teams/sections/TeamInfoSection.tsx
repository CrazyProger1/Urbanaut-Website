import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Edit, Users } from "lucide-react";
import { PLACEHOLDERS } from "@/config";
import { getTranslations, getFormatter } from "next-intl/server";
import { TeamDetail } from "@/types";

type Props = {
  team: TeamDetail;
  isOwner?: boolean;
};

export const TeamInfoSection = async ({ team, isOwner = false }: Props) => {
  const t = await getTranslations("Modules");
  const format = await getFormatter();

  const initials = team.name.slice(0, 2).toUpperCase();
  const createdAt = Date.parse(team.created_at);

  return (
    <Card className="drop-shadow-volume flex flex-col items-center gap-4 p-4 select-none lg:flex-row">
      <div className="flex min-w-64 flex-col items-center gap-3">
        <Avatar className="h-48 w-48 rounded-2xl">
          <AvatarFallback className="rounded-2xl text-4xl font-bold">{initials}</AvatarFallback>
        </Avatar>
        {isOwner && (
          <div className="flex flex-row gap-1">
            <Button variant="outline" size="icon">
              <Edit />
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 py-4 text-center lg:items-start lg:text-left">
        <div className="text-lg font-bold">{team.name}</div>
        {team.motto && (
          <div className="text-muted-foreground italic">{team.motto}</div>
        )}
        {team.description && (
          <div className="select-text">{team.description}</div>
        )}
        <div className="text-muted-foreground flex flex-row gap-4 text-sm font-medium">
          <div className="flex flex-row items-center gap-1">
            <Users size={16} />
            <div>
              {team.members.length} {t(PLACEHOLDERS.LABEL_MEMBERS)}
            </div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Calendar size={16} />
            <div>
              {t(PLACEHOLDERS.LABEL_JOINED)}{" "}
              {format.dateTime(createdAt, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};