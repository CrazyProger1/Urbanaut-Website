import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { EditProfileForm } from "../forms/EditProfileForm";
import { SessionUser } from "@/types";

type Props = {
  user?: SessionUser;
};

export const EditProfileModal = ({ user }: Props) => {
  return (
    <Modal query={QUERIES.MODAL_EDIT_PROFILE}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{PLACEHOLDERS.TITLE_EDIT_PROFILE}</DialogTitle>
          <DialogDescription>
            {PLACEHOLDERS.DESCRIPTION_EDIT_PROFILE}
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm user={user} />
      </DialogContent>
    </Modal>
  );
};
