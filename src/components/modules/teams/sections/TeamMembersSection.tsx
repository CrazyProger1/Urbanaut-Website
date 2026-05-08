import React from "react";
import { Card } from "@/components/ui/card";
import { UserCard } from "@/components/modules/common/cards";
import { PLACEHOLDERS } from "@/config";
import { getTranslations } from "next-intl/server";
import { Team, TeamMember } from "@/types";

type Props = {
  team: Team;
};

export const TeamMembersSection = async ({ team }: Props) => {
  const t = await getTranslations("Modules");
  const { members, created_by } = team;

  const roleLabel = (member: TeamMember) =>
    member.id === created_by ? t(PLACEHOLDERS.ROLE_CAPTAIN) : t(PLACEHOLDERS.ROLE_MEMBER);

  return (
    <Card className="drop-shadow-volume flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-3">
        {members.map((member) => (
          <UserCard key={member.id} user={member} role={roleLabel(member)} />
        ))}
      </div>
    </Card>
  );
};
