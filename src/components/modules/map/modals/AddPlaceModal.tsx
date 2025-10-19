import React from "react";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { AddPlaceForm } from "../forms";

export const AddPlaceModal = () => {
  return (
    <ModalPortal query="addplace">
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <AddPlaceForm />
      </StopPropagation>
    </ModalPortal>
  );
};
