import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME, IMAGE } from "./manifest";
import "./globals.css";

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
  icons: [
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "/favicons/favicon.ico",
    },
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "/favicons/favicon-16x16.png",
    },
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "/favicons/favicon-32x32.png",
    },
    {
      rel: "mask-icon",
      sizes: "400x400",
      type: "image/png",
      url: "/favicons/safari-pinned-tab-400x400.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "192x192",
      type: "image/png",
      url: "/assets/pwa/apple-icon-192x192.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <div className="layout">{children}</div>
      </body>
    </html>
  );
}
