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
import { Language, Tag } from "@/types";
import { useTranslations } from "next-intl";

type Props = {
  tags?: Tag[];
  languages?: Language[];
};

export const AddPlaceModal = ({ tags, languages }: Props) => {
  const t = useTranslations("Modules");

  return (
    <Modal query={QUERIES.MODAL_PLACE_ADDING}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_CREATE_PLACE)}</DialogTitle>
          <DialogDescription>{t(PLACEHOLDERS.DESCRIPTION_CREATE_PLACE)}</DialogDescription>
        </DialogHeader>
        <PlaceForm tags={tags} languages={languages} />
      </DialogContent>
    </Modal>
  );
};
