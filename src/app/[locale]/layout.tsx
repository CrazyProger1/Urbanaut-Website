import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import "../../styles";
import { NextIntlClientProvider } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GOOGLE_ANALYTICS_ID } from "@/config";
import { ModalProvider } from "@/components/common/modals";
import { AuthModal } from "@/components/modules/login/modals";
import { Header, Footer, Sidebar } from "@/components/modules/layout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/utils/session";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ToastProvider } from "@/components/common/toasts";

export const metadata: Metadata = {
  title: "Urbanaut-Club",
  description:
    "Urbanaut-Club — a social platform for urban explorers, diggers, and extreme tourism enthusiasts.",
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

  return (
    <html lang="en" className={session?.user?.settings?.theme?.toLowerCase() || "dark"}>
    <body className={`${poppins.className}`}>
    <ModalProvider>
      <ToastProvider>
        <SidebarProvider>
          <NextIntlClientProvider>
            <Sidebar />
            <SidebarTrigger />
            <Header />
            {children}
            <Footer />
            <AuthModal />
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
