import React from "react";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { SigninForm } from "../forms";
import { GoogleAuthButton } from "../google";

export const SigninModal = () => {
  return (
    <ModalPortal query="signin">
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <SigninForm otherProviders={[<GoogleAuthButton key="google" />]} />
      </StopPropagation>
    </ModalPortal>
  );
};

