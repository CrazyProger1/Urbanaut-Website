"use client";

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { AddAreaForm } from "@/components/modules/map/forms";
import { Tag } from "@/types";
import { useTranslations } from "next-intl";

type Props = {
  tags?: Tag[];
};

export const AddAreaModal = ({ tags }: Props) => {
  const t = useTranslations("Modules");

  return (
    <Modal query={QUERIES.MODAL_AREA_ADDING}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_CREATE_AREA)}</DialogTitle>
          <DialogDescription>
            {t(PLACEHOLDERS.DESCRIPTION_CREATE_AREA)}
          </DialogDescription>
        </DialogHeader>
        <AddAreaForm tags={tags} />
      </DialogContent>
    </Modal>
  );
};
