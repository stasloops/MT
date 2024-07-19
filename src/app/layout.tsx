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
    <html lang="en">
      <body className={supercell.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
