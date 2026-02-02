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
import { getReferralCodes } from "@/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Page = async () => {
  const session = await getSession();

  if (!session || !session?.user) {
    // TODO: move into middleware
    return redirect({ href: PAGES.MAIN, locale: await getLocale() });
  }

  const response = await getReferralCodes();

  if (!response.success || response.results.length === 0) return null;

  const codes = response.results;

  const { user } = session;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <EditProfileModal user={user} />
      {codes && <ReferralModal codes={codes} />}
      <UserInfoSection user={user} me />
      <UserActivitySection user={user} />
    </div>
  );
};

export default Page;
