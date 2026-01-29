import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { CurrentUser } from "@/types";
import { SettingsForm } from "../forms/SettingsForm";

type Props = {
  user: CurrentUser;
};

export const SettingsModal = ({ user }: Props) => {
  return (
    <Modal query={QUERIES.SETTINGS_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>
        <SettingsForm user={user} />
      </DialogContent>
    </Modal>
  );
};
