import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { AddPlaceForm } from "../forms";
import { Tag } from "@/types";

type Props = {
  tags?: Tag[];
};

export const AddPlaceModal = ({ tags }: Props) => {
  return (
    <Modal query={QUERIES.MODAL_PLACE_ADDING}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{PLACEHOLDERS.TITLE_CREATE_PLACE}</DialogTitle>
          <DialogDescription>{PLACEHOLDERS.DESCRIPTION_CREATE_PLACE}</DialogDescription>
        </DialogHeader>
        <AddPlaceForm tags={tags} />
      </DialogContent>
    </Modal>
  );
};
