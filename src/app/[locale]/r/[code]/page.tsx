import React from "react";
import { Button } from "@/components/ui/button";
import { Link, redirect } from "@/i18n";
import { PAGES, QUERIES } from "@/config";
import { User } from "lucide-react";
import { getLocale } from "next-intl/server";

type Props = {
  params: Promise<{
    code: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { code } = await params;
  const searchParams = new URLSearchParams();

  if (!code) {
    redirect({ href: PAGES.MAIN, locale: await getLocale() });
  }

  searchParams.append(QUERIES.SIGNUP_MODAL, "true");
  searchParams.append("code", code);

  return (
    <div className="flex flex-col items-center">
      <div>You're invited by the link. Register now and will got bonuses in the future! {code}</div>
      <Button asChild>
        <Link href={`${PAGES.MAIN}?${searchParams}`}>
          <User />
          Sign Up
        </Link>
      </Button>
    </div>
  );
};

export default Page;
