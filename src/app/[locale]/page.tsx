import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("HomePage");
  return <div>{t("title")}</div>;
};

export default Page;
