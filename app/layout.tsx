import { Container } from "@/components";
import meta from "@/lib/constants/metadata.json";
import { ClientProvider } from "@/providers/client-provider";
import { ToastProvider } from "@/providers/toast-provider";
import ThemeProvider from "@/theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST_URL ?? ""),
  title: {
    default: meta.longName,
    template: `%s - ${meta.longName}`,
  },
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.longName,
    description: meta.description,
    url: process.env.NEXT_PUBLIC_HOST_URL,
    siteName: meta.longName,
    locale: "en-US",
    type: "website",
    images: [
      {
        url: `/assets/og-image.png`,
        width: 2400,
        height: 1260,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: meta.longName,
    card: "summary_large_image",
    description: meta.description,
    creator: "@UnBlinkApp",
    images: [`/assets/og-image.png`],
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/assets/logo/logo-only.png",
  },
  other: {
    "dscvr:canvas:version": "vNext",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <ThemeProvider>
            <ToastProvider>
              <Container>{children}</Container>
            </ToastProvider>
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
