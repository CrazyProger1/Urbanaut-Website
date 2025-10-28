import type { Metadata } from "next";
import React from "react";
import "../../styles";
import { NextIntlClientProvider } from "next-intl";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GOOGLE_ANALYTICS_ID } from "@/config";
import { ModalProvider } from "@/components/common/modals";
import { SigninModal, SignupModal } from "@/components/modules/login/modals";
import { Header, Footer, Sidebar } from "@/components/modules/layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/utils/session";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ToastProvider } from "@/components/common/toasts";

export const metadata: Metadata = {
  title: "Urbanaut-Club",
  description:
    "Urbanaut-Club — a social platform for urban explorers, diggers, and extreme tourism enthusiasts.",
};

// const poppins = Poppins({
//   weight: ["300", "400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

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
                <SignupModal />
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
