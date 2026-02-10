import type { Metadata } from "next";
import React from "react";
import "../../styles";
import { NextIntlClientProvider } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GOOGLE_ANALYTICS_ID, ONESIGNAL_APP_ID, SITE_URL } from "@/config";
import { ModalProvider } from "@/components/common/modals";
import { SigninModal, SignupModal } from "@/components/modules/login/modals";
import { Header, Footer, Sidebar, OauthProvider } from "@/components/modules/layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/utils/session";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ToastProvider } from "@/components/common/toasts";
import { Poppins } from "next/font/google";
import { FeedbackModal } from "@/components/modules/feedback/modals";
import { SettingsModal } from "@/components/modules/profile/modals";
import { getCountries } from "@/services/api/geo";
import { getNotifications, obtainWebsocketToken } from "@/services";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { OneSignalProvider } from "@/components/lib/onesignal";
import { redirect } from "@/i18n";

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
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;
  const session = await getSession();

  const user = session?.user;

  setRequestLocale(user?.settings.language || locale);

  const theme = user?.settings?.theme || "DARK";

  const countriesResponse = await getCountries();
  const countries = countriesResponse.success ? countriesResponse.results : [];

  const tokenResponse = await obtainWebsocketToken();
  const websocketToken = tokenResponse?.success ? tokenResponse.token : undefined;

  const notificationsResponse = await getNotifications();
  const notifications = notificationsResponse.success ? notificationsResponse.results : [];

  return (
    <html lang="en" className={theme === "DARK" ? "dark" : "light"}>
      <body>
        <ModalProvider>
          <OneSignalProvider
            appId={ONESIGNAL_APP_ID}
            serviceWorkerPath="onesignal/OneSignalSDKWorker.js"
            serviceWorkerParam={{ scope: "/onesignal/" }}
          />
          <OauthProvider />
          <ToastProvider theme={theme}>
            <SidebarProvider>
              <NextIntlClientProvider>
                <Sidebar />
                <CookieConsent variant="default" />
                <SidebarInset className="flex flex-col">
                  <Header
                    user={user}
                    websocketToken={websocketToken}
                    notifications={notifications}
                  />
                  {children}
                  <Footer />
                </SidebarInset>
                <SigninModal />
                <SignupModal countries={countries} />
                <FeedbackModal />
                {user && <SettingsModal user={user} />}
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
