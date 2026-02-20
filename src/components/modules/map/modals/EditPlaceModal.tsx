"use client";

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { PlaceForm } from "../forms";
import { PlaceDetail, Tag } from "@/types";
import { useTranslations } from "next-intl";

type Props = {
  tags?: Tag[];
  place: PlaceDetail;
};

export const EditPlaceModal = ({ tags, place }: Props) => {
  const t = useTranslations("Modules");

  return (
    <Modal query={QUERIES.MODAL_EDIT_PLACE}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_EDIT_PLACE)}</DialogTitle>
          <DialogDescription>{t(PLACEHOLDERS.DESCRIPTION_EDIT_PLACE)}</DialogDescription>
        </DialogHeader>
        <PlaceForm tags={tags} place={place} edit />
      </DialogContent>
    </Modal>
  );
};
