import React from "react";
import { Calendar, ChevronRight, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { News } from "@/types";

const CATEGORY_COLOR: Record<string, string> = {
  UPDATE: "var(--color-notification-update-bg)",
  SUCCESS: "var(--color-notification-success-bg)",
  REMINDER: "var(--color-notification-reminder-bg)",
  SYSTEM: "var(--color-notification-system-bg)",
  SOCIAL: "var(--color-notification-social-bg)",
  ALERT: "var(--color-notification-alert-bg)",
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
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
          {news.map(({ id, published_at, title, subtitle, type }) => {
            const cc = CATEGORY_COLOR[type] ?? "var(--color-notification-default-bg)";
            return (
              <Card
                key={id}
                className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              >
                <CardHeader className="pb-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-white uppercase"
                      style={{ background: cc }}
                    >
                      {type}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Calendar className="size-3" />
                      {fmtDate(published_at)}
                    </span>
                  </div>
                  <CardTitle className="text-sm leading-snug">{title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-muted-foreground text-xs leading-relaxed">{subtitle}</p>
                </CardContent>
                <CardFooter className="pt-0 pb-4">
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Read more <ChevronRight className="size-3" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
