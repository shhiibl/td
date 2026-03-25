import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap'
});

export const metadata = {
  title: "Tidy Mimo | Your Active Cleaning Partner",
  description: "Tidy Mimo delivers powerful cleaning performance with refreshing fragrances, helping people achieve spotless and fresh environments every day.",
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Particles from "./components/Particles";
import OfflineDetector from "./components/OfflineDetector";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        <ServiceWorkerRegister />
        <OfflineDetector />
        <div className="noise-overlay" aria-hidden="true"></div>
        <Preloader />
        <Particles />
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
