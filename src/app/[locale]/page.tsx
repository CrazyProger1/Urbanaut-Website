import { redirect } from "@/i18n";
import { PAGES } from "@/config";
import { getLocale } from "next-intl/server";

type Props = {
  searchParams: Promise<Record<string, string>>;
};

const Page = async ({ searchParams }: Props) => {
  const params = new URLSearchParams(await searchParams);
  redirect({ href: `${PAGES.MAP}?${params}`, locale: await getLocale() });
};

export default Page;
