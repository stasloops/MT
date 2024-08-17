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
      rel: "apple-touch-icon",
      url: "/assets/pwa/apple-icon-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "apple-touch-icon",
      url: "/assets/pwa/apple-icon-512x512.png",
      sizes: "512x512",
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
