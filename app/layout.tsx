import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "800"] });

export const metadata: Metadata = {
  title: "DugnadNett",
  description: "Oppdag og delta i lokale dugnader enkelt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
