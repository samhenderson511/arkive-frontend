import { Analytics } from "@vercel/analytics/next";
import clsx from "clsx";
import { Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { inter } from "./fonts";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "relative antialiased text-foreground flex flex-col min-h-svh bg-background",
          inter.className
        )}
      >
        <NuqsAdapter>{children}</NuqsAdapter>

        <Analytics />
      </body>
    </html>
  );
}
