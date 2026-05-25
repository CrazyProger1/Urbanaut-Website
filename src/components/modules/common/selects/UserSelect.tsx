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
import { User } from "@/types";
import { UserCard } from "@/components/modules/common/cards";

type Props = {
  users?: User[];
  onSearchUsersAction?: (query: string) => void;
  onSelectUserAction?: (user: User) => void;
};

export const UserSelect = ({ users, onSearchUsersAction, onSelectUserAction }: Props) => {
  const [value, setValue] = useState<User | null>(null);

  return (
    <Combobox
      items={users}
      value={value}
      onValueChange={(selected) => {
        if (selected) {
          onSelectUserAction?.(selected as User);
          setValue(null);
        }
      }}
    >
      <ComboboxInput
        placeholder="Select a participant"
        onChange={(event) => {
          onSearchUsersAction?.(event.target.value);
        }}
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(user: User) => (
            <ComboboxItem key={user.id} value={user} className="p-1 data-highlighted:bg-transparent data-highlighted:text-foreground [&>[data-slot=combobox-item-indicator]]:hidden">
              <UserCard user={user} />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
