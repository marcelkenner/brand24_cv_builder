import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { CSSProperties } from "react";

import { cvRootVariables } from "@/features/cv/config/designTokens";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const rootStyle = cvRootVariables as CSSProperties;

export const metadata: Metadata = {
  title: "CV Builder | AI-Assisted Resume Tailoring System",
  description:
    "Recruiter-ready CV variants, live PDF downloads, and a transparent AI workflow case study.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" style={rootStyle}>
        {children}
      </body>
    </html>
  );
}
