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
import { ComplainForm } from "@/components/modules/feedback/forms";

export const ComplainModal = async () => {
  const t = await getTranslations("Modules");

  return (
    <Modal query={QUERIES.MODAL_COMPLAIN}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_COMPLAIN)}</DialogTitle>
          <DialogDescription>{t(PLACEHOLDERS.DESCRIPTION_COMPLAIN)}</DialogDescription>
        </DialogHeader>
        <ComplainForm />
      </DialogContent>
    </Modal>
  );
};
