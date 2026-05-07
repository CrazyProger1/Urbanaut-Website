import React from "react";
import { TeamInfoSection, TeamMembersSection } from "@/components/modules/teams";

type Props = {
  params: Promise<{ id: string }>;
};

const MOCK_TEAM = {
  id: "1",
  name: "Urban Explorers",
  motto: "Explore the forgotten",
  description:
    "A team of passionate urban explorers dedicated to discovering and documenting abandoned places.",
  members_count: 4,
  created_at: "2024-03-10T00:00:00Z",
};

const MOCK_MEMBERS = [
  {
    user: {
      id: "1",
      usernames: ["crazyproger1"],
      first_name: "Nikolay",
      last_name: "Hetman",
      rank: "STALKER" as const,
    },
    role: "captain" as const,
  },
  {
    user: {
      id: "2",
      usernames: ["urbanaut"],
      first_name: "Urban",
      last_name: "Aut",
      rank: "PROFI" as const,
    },
    role: "member" as const,
  },
  {
    user: {
      id: "3",
      usernames: ["explorer99"],
      first_name: "John",
      last_name: "Doe",
      rank: "AMATEUR" as const,
    },
    role: "member" as const,
  },
  {
    user: {
      id: "4",
      usernames: ["stalker_ua"],
      first_name: "Alex",
      last_name: "Koval",
      rank: "ROOKIE" as const,
    },
    role: "member" as const,
  },
];

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const team = { ...MOCK_TEAM, id };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <TeamInfoSection team={team} isOwner />
      <TeamMembersSection members={MOCK_MEMBERS} />
    </div>
  );
};

export default Page;