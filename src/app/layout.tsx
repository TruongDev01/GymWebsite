import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GymPro | Transform Your Body",
  description: "Join the elite community of fitness enthusiasts at GymPro.",
};

import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${lexend.variable} font-body antialiased min-h-screen w-full flex flex-col`}
        suppressHydrationWarning
      >
        <NextTopLoader color="#ff3d5e" height={3} showSpinner={false} shadow="0 0 10px #ff3d5e,0 0 5px #ff3d5e" />
        {children}
      </body>
    </html>
  );
}
