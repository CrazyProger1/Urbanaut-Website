import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { AddPlaceForm } from "../forms";
import { Tag } from "@/types";

type Props = {
  tags?: Tag[];
};

export const AddPlaceModal = ({ tags }: Props) => {
  return (
    <Modal query={QUERIES.PLACE_ADDING_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new place</DialogTitle>
          <DialogDescription>
            Here you can easily create new place
          </DialogDescription>
        </DialogHeader>
        <AddPlaceForm tags={tags} />
      </DialogContent>
    </Modal>
  );
};
