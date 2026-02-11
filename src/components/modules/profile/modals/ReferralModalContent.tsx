"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { PAGES, PLACEHOLDERS, QUERIES, SITE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { CopyToast } from "@/components/common/toasts";
import { Copy } from "lucide-react";
import { Link } from "@/i18n";
import { ReferralCode } from "@/types";
import { usePreservedParamsLink } from "@/hooks";
import { useTranslations } from "next-intl";

type Props = {
  codes: ReferralCode[];
};

export const ReferralModalContent = ({ codes }: Props) => {
  const t = useTranslations("Modules");
  const closeModalLink = usePreservedParamsLink({ [QUERIES.MODAL_REFERRAL_PROFILE]: false });

  return (
    <div className="flex flex-col gap-4">
      {codes.map((code) => (
        <div key={code.code} className="flex flex-row gap-2">
          <Input type="url" value={`${SITE_URL}${PAGES.REFERRAL}/${code.code}`} readOnly />
          <Button variant="outline" asChild>
            <CopyToast clipboard={`${SITE_URL}${PAGES.REFERRAL}/${code.code}`}>
              <Copy />
            </CopyToast>
          </Button>
        </div>
      ))}
      <Button className="w-full" type="button" variant="outline" asChild>
        <Link href={closeModalLink}>{t(PLACEHOLDERS.BUTTON_CANCEL)}</Link>
      </Button>
    </div>
  );
};
