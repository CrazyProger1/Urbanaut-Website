import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import "../../styles";
import { NextIntlClientProvider } from "next-intl";

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

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
