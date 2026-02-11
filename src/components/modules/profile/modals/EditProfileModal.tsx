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
import { useTranslations } from "next-intl";

type Props = {
  user?: SessionUser;
};

export const EditProfileModal = ({ user }: Props) => {
  const t = useTranslations("Profile");
  return (
    <Modal query={QUERIES.MODAL_EDIT_PROFILE}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_EDIT_PROFILE)}</DialogTitle>
          <DialogDescription>
            {t(PLACEHOLDERS.DESCRIPTION_EDIT_PROFILE)}
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm user={user} />
      </DialogContent>
    </Modal>
  );
};
