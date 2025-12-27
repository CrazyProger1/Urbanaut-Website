import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { SignupForm } from "../forms";
import { GoogleAuthButton } from "../google";

export const SignupModal = () => {
  return (
    <Modal query={QUERIES.SIGNUP_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new account</DialogTitle>
          <DialogDescription>
            Here you can easily create your account in one click
          </DialogDescription>
        </DialogHeader>
        <SignupForm otherProviders={[<GoogleAuthButton key="google" />]} />
      </DialogContent>
    </Modal>
  );
};
