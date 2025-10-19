import React from "react";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { SignupForm } from "../forms";
import { GoogleAuthButton } from "../google";

export const SignupModal = () => {
  return (
    <ModalPortal query="signup">
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <SignupForm otherProviders={[<GoogleAuthButton key="google" />]} />
      </StopPropagation>
    </ModalPortal>
  );
};
