import React from "react";
import { getTranslations } from "next-intl/server";
import { Modal } from "@/components/ui/next/modal";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { ExpeditionCreateForm } from "@/components/modules/expeditions/forms";

export const ExpeditionCreateModal = async () => {
  const t = await getTranslations("Modules");

  return (
    <Modal query={QUERIES.MODAL_CREATE_EXPEDITION}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_CREATE_EXPEDITION)}</DialogTitle>
          <DialogDescription>{t(PLACEHOLDERS.DESCRIPTION_CREATE_EXPEDITION)}</DialogDescription>
        </DialogHeader>
        <ExpeditionCreateForm />
      </DialogContent>
    </Modal>
  );
};
