import config from "@/lib/config.json" assert { type: "json" };
import { Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

const font = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ""),
  title: config.title,
  description: config.description,
  generator: "Next.js",
  applicationName: config.title,
  referrer: "origin-when-cross-origin",
  creator: config.title,
  publisher: config.title,
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/manifest.json`,
  category: config.categories,
  keywords: config.keywords,
  authors: [{ name: config.title, url: process.env.NEXT_PUBLIC_APP_URL }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [{ color: config.colors.background }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <span className="hidden invisible w-4 h-4" />
        <span className="hidden invisible w-3.5 h-3.5" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
