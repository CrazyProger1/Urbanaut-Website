import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { CurrentUser } from "@/types";
import { SettingsForm } from "../forms/SettingsForm";

type Props = {
  user: CurrentUser;
};

export const SettingsModal = ({ user }: Props) => {
  return (
    <Modal query={QUERIES.MODAL_SETTINGS}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{PLACEHOLDERS.TITLE_SETTINGS}</DialogTitle>
          <DialogDescription>
            {PLACEHOLDERS.DESCRIPTION_SETTINGS}
          </DialogDescription>
        </DialogHeader>
        <SettingsForm user={user} />
      </DialogContent>
    </Modal>
  );
};
