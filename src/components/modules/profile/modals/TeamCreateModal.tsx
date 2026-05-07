import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { TeamCreateForm } from "../forms/TeamCreateForm";
import { useTranslations } from "next-intl";

export const TeamCreateModal = () => {
  const t = useTranslations("Modules");
  return (
    <Modal query={QUERIES.MODAL_CREATE_TEAM}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_CREATE_TEAM)}</DialogTitle>
          <DialogDescription>{t(PLACEHOLDERS.DESCRIPTION_CREATE_TEAM)}</DialogDescription>
        </DialogHeader>
        <TeamCreateForm />
      </DialogContent>
    </Modal>
  );
};