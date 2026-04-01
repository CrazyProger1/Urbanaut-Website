import React from "react";
import { News } from "@/types";
import { getNotificationColorClass, getNotificationIconColorClass } from "@/utils/classes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getNotificationIcon } from "@/utils/icons";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { localizeDate } from "@/utils/date";

type Props = {
  news: News;
};

export const NewsCard = ({ news: { title, type, id, published_at, subtitle } }: Props) => {
  const colorClass = getNotificationColorClass(type);
  const iconColorClass = getNotificationIconColorClass(type);
  return (
    <Card
      className={`${colorClass} flex cursor-pointer flex-col transition-transform duration-200 hover:scale-[1.02]`}
    >
      <CardHeader className="pb-2">
        <div className="mb-2 flex items-center justify-between">
          {getNotificationIcon(type, iconColorClass)}
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <Calendar className="size-3" />
            {localizeDate(new Date(published_at))}
          </span>
        </div>
        <CardTitle className="text-sm leading-snug">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-muted-foreground text-xs leading-relaxed">{subtitle}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4">
        <Link
          href={`/news/${id}`}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors"
        >
          Read more
          <ChevronRight className="size-3" />
        </Link>
      </CardFooter>
    </Card>
  );
};
