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

export const FeedbackModal = () => {
  return (
    <Modal query={QUERIES.MODAL_FEEDBACK}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{PLACEHOLDERS.TITLE_FEEDBACK}</DialogTitle>
          <DialogDescription>{PLACEHOLDERS.DESCRIPTION_FEEDBACK}</DialogDescription>
        </DialogHeader>
        <FeedbackForm />
      </DialogContent>
    </Modal>
  );
};
