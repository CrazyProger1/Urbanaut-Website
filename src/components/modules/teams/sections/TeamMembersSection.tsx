import React from "react";
import { TeamMembersClient } from "./TeamMembersClient";
import { TeamDetail } from "@/types";

type Props = {
  team: TeamDetail;
};

export const TeamMembersSection = ({ team }: Props) => {
  return <TeamMembersClient teamId={team.id} createdBy={team.created_by} />;
};