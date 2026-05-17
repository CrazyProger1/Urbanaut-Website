import React from "react";
import { Newspaper } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { NewsCard } from "@/components/modules/main/sections/NewsCard";
import { News } from "@/types";
import { PLACEHOLDERS } from "@/config";

type Props = {
  news: News[];
};

export const NewsSection = ({ news }: Props) => {
  const t = useTranslations("Modules");

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 select-none">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Newspaper className="text-muted-foreground size-6" />
            {t(PLACEHOLDERS.TITLE_NEWS)}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{t(PLACEHOLDERS.DESCRIPTION_NEWS)}</p>
        </div>
      </header>

      {news.length === 0 ? (
        <Card className="text-muted-foreground flex items-center justify-center p-8 text-sm">
          {t(PLACEHOLDERS.LABEL_NO_NEWS_YET)}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </section>
  );
};
