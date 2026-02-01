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

type Props = {
  countries?: Country[];
};

export const SignupModal = ({ countries }: Props) => {
  return (
    <Modal query={QUERIES.MODAL_SIGNUP}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{PLACEHOLDERS.TITLE_SIGNUP}</DialogTitle>
          <DialogDescription>
            {PLACEHOLDERS.DESCRIPTION_SIGNUP}
          </DialogDescription>
        </DialogHeader>
        <SignupForm otherProviders={[<GoogleAuthButton key="google" />]} countries={countries} />
      </DialogContent>
    </Modal>
  );
};
