import React from "react";
import { TeamInfoSection, TeamMembersSection } from "@/components/modules/teams";
import { getTeam } from "@/services";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const team = await getTeam(id);

  if (!team || !team.success) {
    return;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <TeamInfoSection team={team} isOwner />
      <TeamMembersSection team={team} />
    </div>
  );
};

export default Page;
