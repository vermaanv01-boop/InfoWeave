import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TransformationProvider } from "@/lib/context/TransformationContext";

export const metadata: Metadata = {
  title: "InfoWeave AI — Automated Content Transformation (SIH26154)",
  description:
    "One Source. Multiple Audiences. Multiple Formats. One Configurable AI Transformation Workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8f9fa] text-slate-900 flex antialiased selection:bg-indigo-100 selection:text-indigo-900">
        <TransformationProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
            {children}
          </div>
        </TransformationProvider>
      </body>
    </html>
  );
}
