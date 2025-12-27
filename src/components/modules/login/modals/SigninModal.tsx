import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { SigninForm } from "../forms";
import { GoogleAuthButton } from "../google";

export const SigninModal = () => {
  return (
    <Modal query={QUERIES.SIGNIN_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to your account</DialogTitle>
          <DialogDescription>
            Here you can easily login into your account
          </DialogDescription>
        </DialogHeader>
        <SigninForm otherProviders={[<GoogleAuthButton key="google" />]} />
      </DialogContent>
    </Modal>
  );
};
