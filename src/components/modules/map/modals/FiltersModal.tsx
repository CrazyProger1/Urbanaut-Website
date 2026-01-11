import React from "react";
import { QUERIES } from "@/config";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { FiltersForm } from "@/components/modules/map/forms";
import { APIListCountry, APIListTag } from "@/types";

type Props = {
  countries?: APIListCountry[];
  tags?: APIListTag[];
};
export const FiltersModal = ({ tags, countries }: Props) => {
  return (
    <Modal query={QUERIES.MAP_FILTERS_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <FiltersForm tags={tags} countries={countries} />
      </DialogContent>
    </Modal>
  );
};
