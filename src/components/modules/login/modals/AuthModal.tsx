import React from "react";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { Card } from "@/components/ui/card";
import { AuthForm } from "@/components/modules/login/forms";
import { GoogleAuthButton } from "@/components/modules/login/google";

export const AuthModal = () => {
  return (
    <ModalPortal query="auth">
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <Card className="p-8">
          <AuthForm />
          <GoogleAuthButton />
        </Card>
      </StopPropagation>
    </ModalPortal>
  );
};
