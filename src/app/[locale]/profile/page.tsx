import { getSession } from "@/utils/session";
import React from "react";
import { PAGES } from "@/config";
import { redirect } from "@/i18n";
import { getLocale } from "next-intl/server";
import {
  UserInfoSection,
  UserActivitySection,
  EditProfileModal,
  ReferralModal,
} from "@/components/modules/profile";

const Page = async () => {
  const session = await getSession();

  if (!session || !session?.user) {
    // TODO: move into middleware
    return redirect({ href: PAGES.MAIN, locale: await getLocale() });
  }

  const { user } = session;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <EditProfileModal user={user} />
      <ReferralModal />
      <UserInfoSection user={user} me />
      <UserActivitySection user={user} />
    </div>
  );
};

export default Page;
