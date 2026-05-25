"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Minus, Trophy, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCard, TeamCard } from "@/components/modules/common/cards";
import { UserSelect, TeamSelect } from "@/components/modules/common/selects";
import { searchUsers } from "@/actions/users";
import { searchTeams } from "@/actions/teams";
import { APIListUser, APIListTeam } from "@/types";
import { PLACEHOLDERS } from "@/config";

type Props = {
  initialUsers?: APIListUser[];
  initialTeams?: APIListTeam[];
  onChange: (value: { users: string[]; teams: string[] }) => void;
};

export const PlaceShareSection = ({ initialUsers, initialTeams, onChange }: Props) => {
  const t = useTranslations("Modules");
  const [foundUsers, setFoundUsers] = useState<APIListUser[]>([]);
  const [foundTeams, setFoundTeams] = useState<APIListTeam[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<APIListUser[]>(initialUsers ?? []);
  const [selectedTeams, setSelectedTeams] = useState<APIListTeam[]>(initialTeams ?? []);

  const handleSelectUser = (user: APIListUser) => {
    if (selectedUsers.find((u) => u.id === user.id)) return;
    const next = [...selectedUsers, user];
    setSelectedUsers(next);
    onChange({ users: next.map((u) => u.id), teams: selectedTeams.map((t) => t.id) });
  };

  const handleRemoveUser = (id: string) => {
    const next = selectedUsers.filter((u) => u.id !== id);
    setSelectedUsers(next);
    onChange({ users: next.map((u) => u.id), teams: selectedTeams.map((t) => t.id) });
  };

  const handleSelectTeam = (team: APIListTeam) => {
    if (selectedTeams.find((t) => t.id === team.id)) return;
    const next = [...selectedTeams, team];
    setSelectedTeams(next);
    onChange({ users: selectedUsers.map((u) => u.id), teams: next.map((t) => String(t.id)) });
  };

  const handleRemoveTeam = (id: string) => {
    const next = selectedTeams.filter((t) => t.id !== id);
    setSelectedTeams(next);
    onChange({ users: selectedUsers.map((u) => u.id), teams: next.map((t) => String(t.id)) });
  };

  return (
    <Tabs defaultValue="users">
      <TabsList className="w-full">
        <TabsTrigger value="users" className="gap-1.5">
          <Users className="size-4" />
          {t(PLACEHOLDERS.LABEL_USERS)}
        </TabsTrigger>
        <TabsTrigger value="teams" className="gap-1.5">
          <Trophy className="size-4" />
          {t(PLACEHOLDERS.LABEL_TEAMS)}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="users" className="flex flex-col gap-3">
        <UserSelect
          users={foundUsers}
          onSearchUsersAction={async (query) => {
            const res = await searchUsers(query);
            setFoundUsers(res?.results ?? []);
          }}
          onSelectUserAction={handleSelectUser}
        />
        {selectedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            action={
              <Minus
                className="hover:bg-accent cursor-pointer rounded text-red-500"
                onClick={() => handleRemoveUser(user.id)}
              />
            }
          />
        ))}
      </TabsContent>

      <TabsContent value="teams" className="flex flex-col gap-3">
        <TeamSelect
          teams={foundTeams}
          onSearchTeamsAction={async (query) => {
            const res = await searchTeams(query);
            setFoundTeams(res?.results ?? []);
          }}
          onSelectTeamAction={handleSelectTeam}
        />
        {selectedTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            action={
              <Minus
                className="hover:bg-accent cursor-pointer rounded text-red-500"
                onClick={() => handleRemoveTeam(team.id)}
              />
            }
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};
