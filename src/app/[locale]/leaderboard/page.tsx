import React from "react";
import { LeaderboardSection } from "@/components/modules/leaderboard";
import { getTeams, getUsers } from "@/services";
import { APITeamFilters, APIUserFilters } from "@/types";

type Props = {
  searchParams: Promise<APIUserFilters & APITeamFilters & { tab?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { tab, ...params } = await searchParams;

  const [usersResponse, teamsResponse] = await Promise.all([getUsers(params), getTeams(params)]);
  const users = usersResponse.success ? usersResponse.results : [];
  const teams = teamsResponse.success ? teamsResponse.results : [];

  return <LeaderboardSection tab={tab} users={users} teams={teams} />;
};

export default Page;
