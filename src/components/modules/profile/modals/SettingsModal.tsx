import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { CurrentUser, Language } from "@/types";
import { SettingsForm } from "../forms/SettingsForm";
import { useTranslations } from "next-intl";

type Props = {
  user: CurrentUser;
  languages: Language[];
};

export const SettingsModal = ({ user, languages }: Props) => {
  const t = useTranslations("Modules");
  return (
    <Modal query={QUERIES.MODAL_SETTINGS}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_SETTINGS)}</DialogTitle>
          <DialogDescription>{t(PLACEHOLDERS.DESCRIPTION_SETTINGS)}</DialogDescription>
        </DialogHeader>
        <SettingsForm user={user} languages={languages} />
      </DialogContent>
    </Modal>
  );
};
