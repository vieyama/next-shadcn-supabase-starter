import type { Metadata, Viewport } from "next";
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <NextTopLoader showSpinner={false} />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
