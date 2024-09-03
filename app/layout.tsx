import { Container } from "@/components";
import { ClientProvider } from "@/providers/client-provider";
import { ToastProvider } from "@/providers/toast-provider";
import ThemeProvider from "@/theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unblink App",
  description:
    "Capture and mint authentic moments as NFTs on Solana, preserving real-life experiences in a communal album — mint the moment with UnBlink.",
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
