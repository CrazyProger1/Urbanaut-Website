import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { SignupForm } from "../forms";
import { GoogleAuthButton } from "../google";
import { Country } from "@/types";
import { getTranslations } from "next-intl/server";

type Props = {
  countries?: Country[];
};

export const SignupModal = async ({ countries }: Props) => {
  const t = await getTranslations("Modules");

  return (
    <Modal query={QUERIES.MODAL_SIGNUP}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_SIGNUP)}</DialogTitle>
          <DialogDescription>
            {t(PLACEHOLDERS.DESCRIPTION_SIGNUP)}
          </DialogDescription>
        </DialogHeader>
        <SignupForm otherProviders={[<GoogleAuthButton key="google" />]} countries={countries} />
      </DialogContent>
    </Modal>
  );
};
