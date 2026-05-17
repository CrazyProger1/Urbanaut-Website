import React from "react";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { PLACEHOLDERS } from "@/config";
import { useTranslations } from "next-intl";
import { oauthViaGoogle } from "@/actions";

type Props = {
  authCode?: string;
};

export const GoogleAuthButton = ({ authCode }: Props) => {
  const t = useTranslations("Modules");
  return (
    <Button asChild variant="outline" onClick={async () => await oauthViaGoogle(authCode)}>
      <FaGoogle />
      <p>{t(PLACEHOLDERS.BUTTON_GOOGLE_AUTH)}</p>
    </Button>
  );
};
