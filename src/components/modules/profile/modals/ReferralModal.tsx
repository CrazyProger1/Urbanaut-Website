import React from "react";
import { QUERIES, PLACEHOLDERS } from "@/config";
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
  return (
    <Modal query={QUERIES.MODAL_REFERRAL_PROFILE}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Referral Program</DialogTitle>
          <DialogDescription>{PLACEHOLDERS.DESCRIPTION_REFERRAL}</DialogDescription>
        </DialogHeader>
        <ReferralModalContent codes={codes} />
      </DialogContent>
    </Modal>
  );
};
