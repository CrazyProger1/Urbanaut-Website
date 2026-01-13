import React from "react";
import { QUERIES } from "@/config";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { FiltersForm } from "@/components/modules/map/forms";
import { City, Country, Tag } from "@/types";

type Props = {
  countries?: Country[];
  cities?: City[];
  tags?: Tag[];
  onSearchCityAction?: (term: string) => void;
  onLoadMoreCitiesAction?: () => void;
};

export const FiltersModal = ({
  tags,
  countries,
  cities,
  onLoadMoreCitiesAction,
  onSearchCityAction,
}: Props) => {
  return (
    <Modal query={QUERIES.MAP_FILTERS_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <FiltersForm
          tags={tags}
          countries={countries}
          cities={cities}
          onLoadMoreCitiesAction={onLoadMoreCitiesAction}
          onSearchCityAction={onSearchCityAction}
        />
      </DialogContent>
    </Modal>
  );
};
