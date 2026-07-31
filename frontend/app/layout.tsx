import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Stress Monitoring System",
  description: "IoT Stress Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </TooltipProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}