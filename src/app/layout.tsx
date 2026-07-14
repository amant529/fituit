import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import InstallPrompt from "@/components/InstallPrompt";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "FITUIT | Strength. Balance. You.",
    template: "%s | FITUIT"
  },
  description: "The ultimate Calisthenics & Yoga hybrid app. No gym, no weights. Master your body with AI-powered personalized routines.",
  keywords: ["Calisthenics", "Yoga", "Fitness App", "Home Workout", "Bodyweight Training", "AI Coach", "FITUIT"],
  authors: [{ name: "FITUIT" }],
  creator: "FITUIT",
  publisher: "FITUIT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://FITUIT.app",
    title: "FITUIT | Strength. Balance. You.",
    description: "The ultimate Calisthenics & Yoga hybrid app. Master your body with AI-powered personalized routines.",
    siteName: "FITUIT",
    images: [{
      url: "/logo.jpg",
      width: 1200,
      height: 630,
      alt: "FITUIT Logo"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "FITUIT | Strength. Balance. You.",
    description: "The ultimate Calisthenics & Yoga hybrid app. Master your body with AI-powered personalized routines.",
    images: ["/logo.jpg"],
    creator: "@FITUITapp"
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                  console.log('ServiceWorker registration failed: ', err);
                });
              });
            }
          `}
        </Script>
        <InstallPrompt />
      </body>
    </html>
  );
}
