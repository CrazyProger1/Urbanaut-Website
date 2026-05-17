import React from "react";
import { NewsSection } from "@/components/modules/news";
import { getNews } from "@/services";

const Page = async () => {
  const response = await getNews({ ordering: "-published_at" });
  const news = response.success ? response.results : [];

  return <NewsSection news={news} />;
};

export default Page;
