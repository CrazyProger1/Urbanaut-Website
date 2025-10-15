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

const RootLayout = async ({ children }: Props) => {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className}`}>
        <ModalProvider>
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
        </ModalProvider>
      </body>
    </html>
  );
};

export default RootLayout;
