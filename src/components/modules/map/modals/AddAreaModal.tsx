import React from "react";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { AddAreaForm } from "@/components/modules/map/forms";
import { QUERIES } from "@/config";
import { APITag } from "@/types";

type Props = {
  tags?: APITag[];
};

export const AddAreaModal = ({ tags }: Props) => {
  return (
    <ModalPortal query={QUERIES.AREA_MODAL}>
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <AddAreaForm tags={tags} />
      </StopPropagation>
    </ModalPortal>
  );
};
