import React from "react";
import { ModalPortal, StopPropagation } from "@/components/common/modals";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/components/modules/login/forms";
import { GoogleAuthButton } from "@/components/modules/login/google";

export const AuthModal = () => {
  return (
    <ModalPortal query="auth">
      <StopPropagation className="sm:w-1/2 md:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>Login or signup to your account</CardTitle>
            <CardDescription>
              Here you can easily create your account in one click 😉
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <AuthForm />
            <GoogleAuthButton />
          </CardContent>
        </Card>
      </StopPropagation>
    </ModalPortal>
  );
};
