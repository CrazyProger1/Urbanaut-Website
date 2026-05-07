import React from "react";
import { Card } from "@/components/ui/card";
import { UserCard } from "@/components/modules/common/cards";
import { PLACEHOLDERS } from "@/config";
import { getTranslations } from "next-intl/server";
import { User } from "@/types";

type TeamMember = {
  user: User;
  role: "captain" | "member";
};

type Props = {
  members: TeamMember[];
};

export const TeamMembersSection = async ({ members }: Props) => {
  const t = await getTranslations("Modules");

  const roleLabel = (role: TeamMember["role"]) =>
    role === "captain" ? t(PLACEHOLDERS.ROLE_CAPTAIN) : t(PLACEHOLDERS.ROLE_MEMBER);

  return (
    <Card className="drop-shadow-volume flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-3">
        {members.map(({ user, role }) => (
          <UserCard key={user.id} user={user} role={roleLabel(role)} />
        ))}
      </div>
    </Card>
  );
};