import { Inter as FontSans } from "next/font/google";

import "./globals.css";

import { Suspense } from "react";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import { Sidebar } from "./sidebar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
            <Sidebar />
            <div className="ml-64 p-4">
              <Suspense fallback={null}>{children}</Suspense>
            </div>
          </main>
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
