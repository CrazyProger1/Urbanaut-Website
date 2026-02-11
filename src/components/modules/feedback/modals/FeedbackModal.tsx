import React from "react";
import { QUERIES, PLACEHOLDERS } from "@/config";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { FeedbackForm } from "@/components/modules/feedback/forms";
import { getTranslations } from "next-intl/server";

export const FeedbackModal = async () => {
  const t = await getTranslations("Modules");

  return (
    <Modal query={QUERIES.MODAL_FEEDBACK}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_FEEDBACK)}</DialogTitle>
          <DialogDescription>{t(PLACEHOLDERS.DESCRIPTION_FEEDBACK)}</DialogDescription>
        </DialogHeader>
        <FeedbackForm />
      </DialogContent>
    </Modal>
  );
};
