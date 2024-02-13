import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "800"] });

export const metadata: Metadata = {
  title: "DugnadNett",
  description: "Oppdag og delta i lokale dugnader enkelt",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className + " w-screen overflow-x-hidden flex flex-col min-h-screen"}>
        <SessionProvider session={session}>
          <NavBar />
          <div className="grow">
          {children}
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
