import React from "react";
import { QUERIES } from "@/config";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { FiltersForm } from "@/components/modules/map/forms";

export const FiltersModal = () => {
  return (
    <Modal query={QUERIES.FILTERS_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <FiltersForm />
      </DialogContent>
    </Modal>
  );
};
