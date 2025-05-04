"use client"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center glassmorphic p-8 rounded-xl">
        <h1 className="text-6xl font-orbitron font-bold mb-4 neon-text">404</h1>
        <p className="text-xl text-white/70 mb-6">Oops! Page not found</p>
        <Link 
          href="/" 
          className="neon-button inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 