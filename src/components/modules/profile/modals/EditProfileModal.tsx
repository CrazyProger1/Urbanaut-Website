import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { EditProfileForm } from "../forms/EditProfileForm";
import { SessionUser } from "@/types";

type Props = {
  user?: SessionUser;
};

export const EditProfileModal = ({ user }: Props) => {
  return (
    <Modal query={QUERIES.EDIT_PROFILE_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm user={user} />
      </DialogContent>
    </Modal>
  );
};
