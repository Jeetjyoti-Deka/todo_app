import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftSidebar from "@/components/LeftSidebar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "App to manage your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("overflow-x-hidden h-full", inter.className)}>
        <div className="relative flex justify-start">
          <LeftSidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
