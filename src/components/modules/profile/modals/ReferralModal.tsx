import React from "react";
import { QUERIES, PLACEHOLDERS } from "@/config";
import { getTranslations } from "next-intl/server";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { ReferralModalContent } from "./ReferralModalContent";
import { ReferralCode } from "@/types";

type Props = {
  codes: ReferralCode[];
};

export const ReferralModal = async ({ codes }: Props) => {
  const t = await getTranslations("Profile");
  return (
    <Modal query={QUERIES.MODAL_REFERRAL_PROFILE}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t(PLACEHOLDERS.TITLE_REFERRAL)}</DialogTitle>
          <DialogDescription>{t(PLACEHOLDERS.DESCRIPTION_REFERRAL)}</DialogDescription>
        </DialogHeader>
        <ReferralModalContent codes={codes} />
      </DialogContent>
    </Modal>
  );
};
