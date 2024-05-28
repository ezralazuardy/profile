import config from "@/lib/config.json" assert { type: "json" };
import { Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "@/app/globals.css";

const font = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  metadataBase: new URL(`https://${config.hostname}`),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: config.title,
    title: config.title,
    description: config.description,
    images: [
      {
        alt: config.title,
        url: `/og.png`,
        width: 1600,
        height: 800,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en_US">
      <body className={font.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
