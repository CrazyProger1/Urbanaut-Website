import React from "react";
import { UserInfoSection, UserActivitySection } from "@/components/modules/profile";
import { getUserByUsername } from "@/services";

type Props = {
  params: Promise<{ username: string }>;
};

const Page = async ({ params }: Props) => {
  const { username } = await params;
  const response = await getUserByUsername(username);
  if (!response.success) {
    return;
  }

  const user = response;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <UserInfoSection user={user} />
      <UserActivitySection user={user} />
    </div>
  );
};

export default Page;
