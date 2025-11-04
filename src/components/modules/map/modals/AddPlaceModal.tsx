import React from "react";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { AddPlaceForm } from "../forms";
import { QUERIES } from "@/config";
import { APITag } from "@/types";

type Props = {
  tags?: APITag[];
};

export const AddPlaceModal = ({ tags }: Props) => {
  return (
    <ModalPortal query={QUERIES.PLACE_MODAL}>
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <AddPlaceForm tags={tags} />
      </StopPropagation>
    </ModalPortal>
  );
};
