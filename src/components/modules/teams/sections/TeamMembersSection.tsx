import React from "react";
import { TeamMembersClient } from "./TeamMembersClient";
import { Team } from "@/types";

type Props = {
  team: Team;
};

export const TeamMembersSection = ({ team }: Props) => {
  return <TeamMembersClient teamId={team.id} createdBy={team.created_by} />;
};