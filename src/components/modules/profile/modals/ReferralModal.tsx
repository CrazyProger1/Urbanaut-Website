import React from "react";
import { PAGES, QUERIES, SITE_URL } from "@/config";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { CopyToast } from "@/components/common/toasts";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getReferralCodes } from "@/services";

export const ReferralModal = async () => {
  const response = await getReferralCodes();

  if (!response.success || response.results.length === 0) return null;

  const codes = response.results;

  return (
    <Modal query={QUERIES.REFERRAL_PROFILE_MODAL}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Referral Program</DialogTitle>
          <DialogDescription>
            Invite your friends to join and earn rewards for every successful referral. Bonuses will
            be available soon - stay tuned!
          </DialogDescription>
        </DialogHeader>
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
        </div>
      </DialogContent>
    </Modal>
  );
};
