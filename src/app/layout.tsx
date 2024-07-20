import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME } from "./manifest";
import { Header } from "@/shared/ui/design_system";
import localFont from "next/font/local";

const supercell = localFont({
  src: "../shared/ui/fonts/KZSupercell-Magic.ttf",
  variable: "--supercell",
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
  viewport: "width=device-width, initial-scale=1.0",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    images: ["favicon.png"],
    type: "website",
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={supercell.className}>
        <div className="container">
          <div className="background"></div>
          <div className="layout">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
