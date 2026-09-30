import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "INFOWEAVE — Cyber Intelligence & Content Transformation",
  description:
    "Enterprise GenAI platform for transforming cybersecurity source documents into verified multi-format intelligence packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8f9fa] text-slate-900 flex antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
