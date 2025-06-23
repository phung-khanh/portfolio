import Footer from "@/features/Home/Components/Footer";
import Header from "@/features/Home/Components/Header";
import "@/shared/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import React from "react";

export const metadata = {
  title: "My Portfolio",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  description: "My personal portfolio showcasing projects and skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <body className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
