import React from "react";
import { QUERIES } from "@/config";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { FeedbackForm } from "@/components/modules/feedback/forms";

export const FeedbackModal = () => {
  return (
    <ModalPortal query={QUERIES.FEEDBACK_MODAL}>
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <FeedbackForm />
      </StopPropagation>
    </ModalPortal>
  );
};
