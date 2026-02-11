import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, redirect } from "@/i18n";
import { PAGES, PLACEHOLDERS, QUERIES } from "@/config";
import { User, Gift, Sparkles, Users } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { CopyToast } from "@/components/common/toasts";

type Props = {
  params: Promise<{
    code: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { code } = await params;
  const t = await getTranslations("Modules");
  const searchParams = new URLSearchParams();

  if (!code) {
    redirect({ href: PAGES.MAIN, locale: await getLocale() });
  }

  searchParams.append(QUERIES.MODAL_SIGNUP, "true");
  searchParams.append("code", code);

  return (
    <div className="from-primary/5 via-background to-primary/10 flex flex-1 items-center justify-center bg-linear-to-br p-4 select-none">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="space-y-4 pb-8 text-center">
          <Image
            src="/web-app-manifest-512x512.png"
            alt="Urbanaut Logo"
            width={128}
            height={128}
            className="mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48"
          />
          <div>
            <CardTitle className="mb-2 text-4xl">{t(PLACEHOLDERS.TITLE_REFERRAL_INVITE)}</CardTitle>
            <CardDescription className="text-lg">
              {t(PLACEHOLDERS.DESCRIPTION_REFERRAL_INVITE)}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              {t(PLACEHOLDERS.LABEL_REFERRAL_INVITED_TEXT)}
            </p>

            <div className="flex flex-col items-center gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                {t(PLACEHOLDERS.LABEL_INVITATION_CODE)}
              </span>
              <CopyToast clipboard={code}>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 hover:bg-primary/15 px-6 py-2 font-mono text-xl"
                >
                  {code}
                </Badge>
              </CopyToast>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-center text-lg font-semibold">{t(PLACEHOLDERS.LABEL_REFERRAL_BENEFITS)}</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4 text-center">
                <Gift className="text-primary h-8 w-8" />
                <p className="text-sm font-medium">{t(PLACEHOLDERS.LABEL_REFERRAL_BONUSES)}</p>
                <p className="text-muted-foreground text-xs">
                  {t(PLACEHOLDERS.DESCRIPTION_REFERRAL_BONUSES)}
                </p>
              </div>
              <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4 text-center">
                <Sparkles className="text-primary h-8 w-8" />
                <p className="text-sm font-medium">{t(PLACEHOLDERS.LABEL_REFERRAL_TOOLS)}</p>
                <p className="text-muted-foreground text-xs">
                  {t(PLACEHOLDERS.DESCRIPTION_REFERRAL_TOOLS)}
                </p>
              </div>
              <div className="bg-muted/50 flex flex-col items-center gap-2 rounded-lg p-4 text-center">
                <Users className="text-primary h-8 w-8" />
                <p className="text-sm font-medium">{t(PLACEHOLDERS.LABEL_REFERRAL_COMMUNITY)}</p>
                <p className="text-muted-foreground text-xs">
                  {t(PLACEHOLDERS.DESCRIPTION_REFERRAL_COMMUNITY)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button asChild size="lg" className="w-full text-base font-semibold">
            <Link href={`${PAGES.MAIN}?${searchParams}`}>
              <User className="mr-2" />
              {t(PLACEHOLDERS.BUTTON_CREATE_ACCOUNT)}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
