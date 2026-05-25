"use client";

import React, { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { APIListTeam } from "@/types";
import { TeamCard } from "@/components/modules/common/cards";

type Props = {
  teams?: APIListTeam[];
  onSearchTeamsAction?: (query: string) => void;
  onSelectTeamAction?: (team: APIListTeam) => void;
};

export const TeamSelect = ({ teams, onSearchTeamsAction, onSelectTeamAction }: Props) => {
  const [value, setValue] = useState<APIListTeam | null>(null);

  return (
    <Combobox
      items={teams}
      value={value}
      onValueChange={(selected) => {
        if (selected) {
          onSelectTeamAction?.(selected as APIListTeam);
          setValue(null);
        }
      }}
    >
      <ComboboxInput
        placeholder="Select a team"
        onChange={(event) => {
          onSearchTeamsAction?.(event.target.value);
        }}
      />
      <ComboboxContent>
        <ComboboxEmpty>No teams found.</ComboboxEmpty>
        <ComboboxList>
          {(team: APIListTeam) => (
            <ComboboxItem key={team.id} value={team} className="p-1 data-highlighted:bg-transparent data-highlighted:text-foreground [&>[data-slot=combobox-item-indicator]]:hidden">
              <TeamCard team={team} />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
