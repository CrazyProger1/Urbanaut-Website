import React from "react";
import { notFound } from "next/navigation";
import { UserInfoSection, UserActivitySection } from "@/components/modules/profile";
import { getUserByUsername } from "@/services";
import { getSession } from "@/utils/session";
import { redirect } from "@/i18n";
import { PAGES } from "@/config";
import { getLocale } from "next-intl/server";

type Props = {
  params: Promise<{ username: string }>;
};

const Page = async ({ params }: Props) => {
  const { username } = await params;
  const session = await getSession();

  const response = await getUserByUsername(username);
  if (!response.success) {
    notFound();
  }

  const user = response;

  if (session?.user?.id === user.id) {
    return redirect({ href: PAGES.PROFILE, locale: await getLocale() });
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <UserInfoSection user={user} />
      <UserActivitySection user={user} />
    </div>
  );
};

export default Page;
