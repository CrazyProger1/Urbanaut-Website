import { PAGES, SITE_URL } from "@/config";
import { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}${PAGES.MAP}`, lastModified: new Date() },
  ];
};

export default sitemap;
