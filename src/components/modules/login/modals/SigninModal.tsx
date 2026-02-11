import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { SigninForm } from "../forms";
import { GoogleAuthButton } from "../google";
import { getTranslations } from "next-intl/server";

export const SigninModal = async () => {
  const t = await getTranslations("Modules");

  return (
    <Modal query={QUERIES.MODAL_SIGNIN}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_SIGNIN)}</DialogTitle>
          <DialogDescription>
            {t(PLACEHOLDERS.DESCRIPTION_SIGNIN)}
          </DialogDescription>
        </DialogHeader>
        <SigninForm otherProviders={[<GoogleAuthButton key="google" />]} />
      </DialogContent>
    </Modal>
  );
};
