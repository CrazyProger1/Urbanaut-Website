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

export const SigninModal = () => {
  return (
    <Modal query={QUERIES.MODAL_SIGNIN}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{PLACEHOLDERS.TITLE_SIGNIN}</DialogTitle>
          <DialogDescription>
            {PLACEHOLDERS.DESCRIPTION_SIGNIN}
          </DialogDescription>
        </DialogHeader>
        <SigninForm otherProviders={[<GoogleAuthButton key="google" />]} />
      </DialogContent>
    </Modal>
  );
};
