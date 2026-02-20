"use client";
import "./globals.css";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme";
import { NextIntlClientProvider } from "next-intl";
import { DataGridProvider } from "@/context/DataGridContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DataGridProvider>
          <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
            <ThemeProvider theme={theme}>
              <NextIntlClientProvider locale={"en"}>
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </NextAppDirEmotionCacheProvider>
        </DataGridProvider>
      </body>
    </html>
  );
}
