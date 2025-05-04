"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-neon-blue neon-text' : 'text-white hover:text-neon-purple transition-colors';
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50">
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-xl z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div className="fixed inset-x-0 bottom-16 p-4 glassmorphic rounded-t-2xl z-50 animate-fade-in">
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex items-center justify-center mb-4">
              <Logo className="w-16 h-16" />
            </div>

            {isAuthenticated ? (
              <>
                <Link 
                  href="/categories" 
                  className={`font-orbitron text-center py-3 text-xl ${isActive('/categories')}`}
                  onClick={() => setIsOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  href="/swipe" 
                  className={`font-orbitron text-center py-3 text-xl ${isActive('/swipe')}`}
                  onClick={() => setIsOpen(false)}
                >
                  Swipe
                </Link>
                <Link 
                  href="/portfolio" 
                  className={`font-orbitron text-center py-3 text-xl ${isActive('/portfolio')}`}
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="neon-button w-full mt-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`font-orbitron text-center py-3 text-xl ${isActive('/login')}`}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="neon-button w-full mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <div className="glassmorphic flex items-center justify-around py-3">
        <Link href="/" className={`flex flex-col items-center ${isActive('/')}`} onClick={() => setIsOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        {isAuthenticated && (
          <>
            <Link href="/categories" className={`flex flex-col items-center ${isActive('/categories')}`} onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3h.393a7.5 7.5 0 007.92 12.446A7.5 7.5 0 0019.5 19H4.5A7.5 7.5 0 003.687 15.446 7.5 7.5 0 0011.607 3H12z"></path>
                <path d="M8 16l.01-0"></path>
                <path d="M12 16l.01-0"></path>
                <path d="M16 16l.01-0"></path>
              </svg>
              <span className="text-xs mt-1">Categories</span>
            </Link>
            
            <Link href="/swipe" className={`flex flex-col items-center ${isActive('/swipe')}`} onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16.5 2.5L21 8L16.5 13.5"></path>
                <path d="M21 8H9C7.61929 8 6.5 9.11929 6.5 10.5V10.5C6.5 11.8807 7.61929 13 9 13H12"></path>
                <path d="M7.5 21.5L3 16L7.5 10.5"></path>
                <path d="M3 16H15C16.3807 16 17.5 14.8807 17.5 13.5V13.5C17.5 12.1193 16.3807 11 15 11H12"></path>
              </svg>
              <span className="text-xs mt-1">Swipe</span>
            </Link>
            
            <Link href="/portfolio" className={`flex flex-col items-center ${isActive('/portfolio')}`} onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                <path d="M16 2v4"></path>
                <path d="M8 2v4"></path>
                <path d="M12 14v3"></path>
                <path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
              </svg>
              <span className="text-xs mt-1">Portfolio</span>
            </Link>
          </>
        )}
        
        <button className={`flex flex-col items-center text-white`} onClick={() => setIsOpen(!isOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span className="text-xs mt-1">Menu</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
