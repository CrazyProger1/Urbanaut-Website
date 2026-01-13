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
import { Country } from "@/types";

type Props = {
  countries?: Country[];
};

export const SignupModal = ({ countries }: Props) => {
  return (
    <Modal query={QUERIES.SIGNUP_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new account</DialogTitle>
          <DialogDescription>
            Here you can easily create your account in one click
          </DialogDescription>
        </DialogHeader>
        <SignupForm otherProviders={[<GoogleAuthButton key="google" />]} countries={countries} />
      </DialogContent>
    </Modal>
  );
};
