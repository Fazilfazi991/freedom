import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from "@/context/DashboardContext";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "5,000 AED Journey — Zorx Digital",
  description: "Real-time tracking of public client acquisition experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[#c5a059]/30 selection:text-white`}
    >
      <body className="bg-cinematic min-h-screen text-white flex flex-col md:flex-row">
        <DashboardProvider>
          <Sidebar />
          <main className="flex-1 w-full overflow-x-hidden">
            {children}
          </main>
        </DashboardProvider>
      </body>
    </html>
  );
}
