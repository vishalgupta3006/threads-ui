import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { dark } from "@clerk/themes";
import "../globals.css";

export const metadata: Metadata = {
  title: "Threads",
  description:
    "It is a clone of threads application using nextjs 13",
};
type Props = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: Props) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex items-center justify-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
