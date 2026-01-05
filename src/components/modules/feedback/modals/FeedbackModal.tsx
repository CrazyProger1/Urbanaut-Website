import React from "react";
import { QUERIES } from "@/config";
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
    <Modal query={QUERIES.FEEDBACK_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>Here you can easily leave feedback ❤️</DialogDescription>
        </DialogHeader>
        <FeedbackForm />
      </DialogContent>
    </Modal>
  );
};
