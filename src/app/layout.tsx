import type { Metadata } from "next";

import { APP_DESCRIPTION, APP_NAME, IMAGE } from "./manifest";
import localFont from "next/font/local";
import "./globals.css";

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
    images: [IMAGE],
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
        <div className="layout">{children}</div>
      </body>
    </html>
  );
}
