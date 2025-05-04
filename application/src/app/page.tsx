
"use client"
import React from "react";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Page = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0f10] to-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00FFFF22_0,transparent_50%)]"></div>
          
          {/* Animated orbs */}
          <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-neon-blue/10 blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-neon-purple/10 blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-60 right-40 w-32 h-32 rounded-full bg-neon-pink/10 blur-2xl animate-pulse-glow" style={{animationDelay: '0.5s'}}></div>
          
          <div className="container relative z-10 mx-auto px-4 flex flex-col items-center">
            <div className="flex items-center mb-6">
              <Logo className="w-16 h-16 md:w-20 md:h-20" />
              <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-neon ml-4">
                CoinSwipe
              </h1>
            </div>
            
            <h2 className="font-orbitron text-xl md:text-3xl text-white text-center max-w-2xl mb-6">
              Discover Crypto Like Never Before
            </h2>
            
            <p className="text-white/70 text-center max-w-lg mb-12">
              Swipe right to discover and invest in the next big cryptocurrency tokens. 
              Your crypto journey is just a flick away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/categories" className="neon-button">
                    Explore Categories
                  </Link>
                  <Link href="/swipe" className="neon-button">
                    Start Swiping
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/register" className="neon-button">
                    Get Started
                  </Link>
                  <Link href="/login" className="neon-button">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="font-orbitron text-2xl md:text-4xl text-center neon-text mb-16">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glassmorphic p-6 rounded-xl flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-blue">
                    <path d="M16.5 2.5L21 8L16.5 13.5"></path>
                    <path d="M21 8H9C7.61929 8 6.5 9.11929 6.5 10.5V10.5C6.5 11.8807 7.61929 13 9 13H12"></path>
                    <path d="M7.5 21.5L3 16L7.5 10.5"></path>
                    <path d="M3 16H15C16.3807 16 17.5 14.8807 17.5 13.5V13.5C17.5 12.1193 16.3807 11 15 11H12"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-xl mb-2 text-white">Swipe to Discover</h3>
                <p className="text-white/70">Find your next investment with our intuitive swipe interface. Explore tokens across different categories.</p>
              </div>
              
              <div className="glassmorphic p-6 rounded-xl flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple">
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </div>
                <h3 className="font-orbitron text-xl mb-2 text-white">AI Recommendations</h3>
                <p className="text-white/70">Receive personalized token suggestions based on AI-analyzed on-chain data.</p>
              </div>
              
              <div className="glassmorphic p-6 rounded-xl flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-neon-pink/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-pink">
                    <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                    <path d="M16 2v4"></path>
                    <path d="M8 2v4"></path>
                    <path d="M12 14v3"></path>
                    <path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-xl mb-2 text-white">Portfolio Management</h3>
                <p className="text-white/70">Track your investments and manage your portfolio with detailed performance metrics.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-neon opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-orbitron text-2xl md:text-4xl mb-6 neon-text-purple">Ready to Start Your Crypto Journey?</h2>
              <p className="text-white/70 mb-8">
                Join thousands of traders discovering new opportunities every day with CoinSwipe.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register" className="neon-button">
                  Create Account
                </Link>
                <Link href="/login" className="neon-button">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="glassmorphic py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Logo className="w-8 h-8" />
              <span className="ml-2 text-white/70">© 2025 CoinSwipe. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">Terms</a>
              <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">Privacy</a>
              <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
