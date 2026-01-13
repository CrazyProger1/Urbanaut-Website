import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { AddAreaForm } from "@/components/modules/map/forms";
import { Tag } from "@/types";

type Props = {
  tags?: Tag[];
};

export const AddAreaModal = ({ tags }: Props) => {
  return (
    <Modal query={QUERIES.AREA_ADDING_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new area</DialogTitle>
          <DialogDescription>
            Here you can easily create new area
          </DialogDescription>
        </DialogHeader>
        <AddAreaForm tags={tags} />
      </DialogContent>
    </Modal>
  );
};
