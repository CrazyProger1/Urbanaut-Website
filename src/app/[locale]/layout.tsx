import type { Metadata, Viewport } from "next";
import React from "react";
import "../../styles";
import { NextIntlClientProvider } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GOOGLE_ANALYTICS_ID, ONESIGNAL_APP_ID } from "@/config";
import { ModalProvider } from "@/components/common/modals";
import { SigninModal, SignupModal } from "@/components/modules/login/modals";
import { Header, Footer, Sidebar, OauthProvider } from "@/components/modules/layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/utils/session";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildRootMetadata, rootViewport } from "@/utils/metadata";
import { ToastProvider } from "@/components/common/toasts";
import { Poppins, Russo_One } from "next/font/google";
import { ComplainCreateModal, FeedbackCreateModal } from "@/components/modules/feedback/modals";
import {
  SettingsModal,
  AchievementModal,
  NotificationModal,
} from "@/components/modules/layout/modals";
import { getCountries } from "@/services/api/geo";
import { getNotifications, obtainWebsocketToken } from "@/services";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { OneSignalProvider } from "@/components/lib/onesignal";
import { getLanguages } from "@/services/api";
import { ExpeditionCreateModal } from "@/components/modules/expeditions/modals";

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  return buildRootMetadata(locale);
};

export const viewport: Viewport = rootViewport;

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const russoOne = Russo_One({
  weight: ["400"],
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

  const languagesResponse = await getLanguages();
  const languages = languagesResponse.success ? languagesResponse.results : [];

  return (
    <html lang="en" className={theme === "DARK" ? "dark" : "light"}>
      <body>
        <ModalProvider>
          <OneSignalProvider
            appId={ONESIGNAL_APP_ID}
            serviceWorkerPath="onesignal/OneSignalSDKWorker.js"
            serviceWorkerParam={{ scope: "/onesignal/" }}
          />
          <ToastProvider theme={theme}>
            <SidebarProvider>
              <NextIntlClientProvider>
                <OauthProvider />
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
                <FeedbackCreateModal />
                <ComplainCreateModal />
                {user && <ExpeditionCreateModal languages={languages} user={user} />}
                {user && languages && <SettingsModal user={user} languages={languages} />}
                <AchievementModal />
                <NotificationModal />
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
