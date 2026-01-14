import type { Metadata } from "next";
import React from "react";
import "../../styles";
import { NextIntlClientProvider } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GOOGLE_ANALYTICS_ID, SITE_URL } from "@/config";
import { ModalProvider } from "@/components/common/modals";
import { SigninModal, SignupModal } from "@/components/modules/login/modals";
import { Header, Footer, Sidebar } from "@/components/modules/layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/utils/session";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ToastProvider } from "@/components/common/toasts";
import { Poppins } from "next/font/google";
import { FeedbackModal } from "@/components/modules/feedback/modals";
import { SettingsModal } from "@/components/modules/settings/modals";
import { getCountries } from "@/services/api/geo";

export const metadata: Metadata = {
  title: "Urbanaut-Club",
  description: "Social platform for urban explorers, diggers, and extreme tourism enthusiasts.",
  keywords: [
    "urbex",
    "urban",
    "urbanaut",
    "club",
    "urbanaut club",
    "exploration",
    "diggers",
    "stalkers",
    "urban exploration",
    "urbex community",
    "abandoned places",
    "urban explorers",
    "extreme tourism",
    "underground exploration",
    "urban adventure",
    "industrial ruins",
  ],
  metadataBase: new URL(SITE_URL),
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

type Props = {
  children: React.ReactNode;
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const RootLayout = async ({ children }: Props) => {
  const session = await getSession();
  setRequestLocale(session?.user?.settings?.language || "en");

  const theme = session?.user?.settings?.theme || "DARK";

  const response = await getCountries();
  const countries = response.success ? response.results : [];

  return (
    <html lang="en" className={theme === "DARK" ? "dark" : "light"}>
      <body>
        <ModalProvider>
          <ToastProvider theme={theme}>
            <SidebarProvider>
              <NextIntlClientProvider>
                <Sidebar />
                <SidebarInset className="flex flex-col">
                  <Header user={session?.user} />
                  {children}
                  <Footer />
                </SidebarInset>
                <SigninModal />
                <SignupModal countries={countries} />
                <FeedbackModal />
                {session?.user && <SettingsModal user={session?.user} />}
              </NextIntlClientProvider>
              <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
            </SidebarProvider>
          </ToastProvider>
        </ModalProvider>
      </body>
    </html>
  );
};

export default RootLayout;
