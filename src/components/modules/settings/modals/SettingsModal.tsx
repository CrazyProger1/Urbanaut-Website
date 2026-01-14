import React from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/next/modal";
import { QUERIES } from "@/config";
import { NotificationsSettingsSection, UISettingsSection } from "..";

export const SettingsModal = () => {
  return (
    <Modal query={QUERIES.SETTINGS_MODAL}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <UISettingsSection />
          <NotificationsSettingsSection />
        </div>
      </DialogContent>
    </Modal>
  );
};
