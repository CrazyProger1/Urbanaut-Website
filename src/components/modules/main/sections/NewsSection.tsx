import React from "react";
import { Newspaper } from "lucide-react";
import { News } from "@/types";
import { NewsCard } from "./NewsCard";

type Props = {
  news: News[];
};

export const NewsSection = ({ news }: Props) => {
  return (
    <section className="bg-muted/20 border-t">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Latest News</h2>
            <p className="text-muted-foreground mt-1 text-sm">Updates from the Urbanaut team</p>
          </div>
          <Newspaper className="text-muted-foreground size-5" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      </div>
    </section>
  );
};
