import React from "react";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { AddAreaForm } from "@/components/modules/map/forms";
import { MODALS } from "@/config";
import { APITag } from "@/types";

type Props = {
  tags?: APITag[];
};

export const AddAreaModal = ({ tags }: Props) => {
  return (
    <ModalPortal query={MODALS.ADD_AREA}>
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <AddAreaForm tags={tags} />
      </StopPropagation>
    </ModalPortal>
  );
};
