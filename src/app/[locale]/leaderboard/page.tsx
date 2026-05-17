import React from "react";
import { LeaderboardSection } from "@/components/modules/leaderboard";
import { getTeams, getUsers } from "@/services";

const DEFAULT_ORDERING = "-experience" as const;

const Page = async () => {
  const [usersResponse, teamsResponse] = await Promise.all([
    getUsers({ ordering: DEFAULT_ORDERING }),
    getTeams({ ordering: DEFAULT_ORDERING }),
  ]);

  const users = usersResponse.success ? usersResponse.results : [];
  const teams = teamsResponse.success ? teamsResponse.results : [];

  return (
    <LeaderboardSection
      initialUsers={users}
      initialTeams={teams}
      initialOrdering={DEFAULT_ORDERING}
    />
  );
};

export default Page;
