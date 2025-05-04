import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { TokenProvider } from "@/context/TokenContext";
import NavBar from "@/components/NavBar";
import MobileNav from "@/components/MobileNav";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoinSwipe - Discover Crypto Like Never Before",
  description: "Swipe right to discover and invest in the next big cryptocurrency tokens.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TokenProvider>
            <Toaster />
            <Sonner />
            <NavBar />
            <MobileNav />
            <main>{children}</main>
          </TokenProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
