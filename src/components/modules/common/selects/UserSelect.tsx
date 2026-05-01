"use client";

import React from "react";
import {
  Combobox,
  ComboboxBackdrop,
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
  return (
    <Combobox
      items={users}
      modal
      onValueChange={(value) => {
        if (value) onSelectUserAction?.(value as User);
      }}
    >
      <ComboboxInput
        placeholder="Select a participant"
        onChange={(event) => {
          onSearchUsersAction?.(event.target.value);
        }}
      />
      <ComboboxBackdrop />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(user: User) => (
            <ComboboxItem key={user.id} value={user} className="p-0">
              <UserCard user={user} />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};