"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/next/modal";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PLACEHOLDERS, QUERIES } from "@/config";
import { ExpeditionCreateForm } from "@/components/modules/expeditions/forms";
import { Language } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

type Props = {
  languages?: Language[];
};

export const ExpeditionCreateModal = ({ languages }: Props) => {
  const t = useTranslations("Modules");
  const [isPlanned, setIsPlanned] = useState(false);

  return (
    <Modal query={QUERIES.MODAL_CREATE_EXPEDITION}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isPlanned
              ? t(PLACEHOLDERS.TITLE_CREATE_EXPEDITION)
              : t(PLACEHOLDERS.TITLE_CREATE_REPORT)}
          </DialogTitle>
          <DialogDescription>
            {isPlanned
              ? t(PLACEHOLDERS.DESCRIPTION_CREATE_EXPEDITION)
              : t(PLACEHOLDERS.DESCRIPTION_CREATE_REPORT)}
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="planned"
          onValueChange={(value) => {
            setIsPlanned(value === "planned");
          }}
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="planned">{t(PLACEHOLDERS.LABEL_PLANNED)}</TabsTrigger>
            <TabsTrigger value="finished">{t(PLACEHOLDERS.LABEL_COMPLETED)}</TabsTrigger>
          </TabsList>
        </Tabs>
        <ExpeditionCreateForm languages={languages} planned={isPlanned} />
      </DialogContent>
    </Modal>
  );
};
