import React from "react";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGES, QUERIES } from "@/config";
import { useTranslations } from "next-intl";

type Props = {
  isAuthenticated: boolean;
};

export const HeroSection = ({ isAuthenticated }: Props) => {
  const t = useTranslations("Modules");
  return (
    <section className="relative flex min-h-130 items-center overflow-hidden border-b">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="from-background via-background/95 to-muted/50 pointer-events-none absolute inset-0 bg-linear-to-br" />
      <div className="bg-primary/5 pointer-events-none absolute bottom-0 left-1/3 h-72 w-80 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
        <h1 className="mb-4 max-w-2xl text-5xl leading-tight font-bold tracking-tight md:text-6xl">
          {t("TITLE_HERO")}
          <br />
          <span className="text-muted-foreground">{t("LABEL_HERO_HIGHLIGHT")}</span>
        </h1>

        <p className="text-muted-foreground mb-8 max-w-xl text-base">{t("DESCRIPTION_HERO")}</p>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href={PAGES.MAP}>
              <MapPin />
              {t("BUTTON_EXPLORE_MAP")}
            </Link>
          </Button>
          {!isAuthenticated ? (
            <Button size="lg" variant="outline" asChild>
              <Link href={`?${QUERIES.MODAL_SIGNIN}=true`}>
                <Users />
                {t("BUTTON_JOIN_COMMUNITY")}
              </Link>
            </Button>
          ) : undefined}
        </div>
      </div>
    </section>
  );
};
