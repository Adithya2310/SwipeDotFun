"use client";

import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-neon-blue neon-text' : 'text-white hover:text-neon-purple transition-colors';
  };

  return (
    <header className="glassmorphic fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="font-orbitron text-2xl font-bold text-transparent bg-clip-text bg-gradient-neon">
            CoinSwipe
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              <Link href="/categories" className={`font-orbitron ${isActive('/categories')}`}>
                Categories
              </Link>
              <Link href="/swipe" className={`font-orbitron ${isActive('/swipe')}`}>
                Swipe
              </Link>
              <Link href="/portfolio" className={`font-orbitron ${isActive('/portfolio')}`}>
                Portfolio
              </Link>
              <button 
                onClick={logout} 
                className="neon-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={`font-orbitron ${isActive('/login')}`}>
                Login
              </Link>
              <Link href="/register" className="neon-button">
                Register
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
