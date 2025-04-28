
import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useTokens } from "../context/TokenContext";
import { Link } from "react-router-dom";
import { Token } from "../types";
import TokenCard from "../components/TokenCard";

const SwipePage = () => {
  const { filteredTokens, currentCategory, likeToken, dislikeToken, likedTokens, dislikedTokens } = useTokens();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<string | null>(null);
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Filter out tokens that the user has already liked or disliked
  const availableTokens = useMemo(() => {
    return filteredTokens.filter(
      (token) => !likedTokens.includes(token.id) && !dislikedTokens.includes(token.id)
    );
  }, [filteredTokens, likedTokens, dislikedTokens]);
  
  const currentToken = availableTokens.length > 0 && currentIndex < availableTokens.length 
    ? availableTokens[currentIndex] 
    : undefined;
  
  const handleDragEnd = (info: PanInfo) => {
    if (!currentToken) return; // Don't handle drags if there's no token
    
    const threshold = 100;
    if (info.offset.x > threshold) {
      // Swiped right
      handleSwipe("right");
    } else if (info.offset.x < -threshold) {
      // Swiped left
      handleSwipe("left");
    } else {
      // Reset position if not enough momentum
      controls.start({ x: 0, y: 0, transition: { duration: 0.3 } });
    }
  };
  
  const handleSwipe = (dir: string) => {
    if (!currentToken) return; // Don't handle swipes if there's no token
    
    setDirection(dir);
    
    const xPosition = dir === "right" ? 1000 : -1000;
    
    controls.start({
      x: xPosition,
      opacity: 0,
      transition: { duration: 0.5 },
    });
    
    setTimeout(() => {
      if (dir === "right" && currentToken) {
        likeToken(currentToken);
      } else if (dir === "left" && currentToken) {
        dislikeToken(currentToken);
      }
      
      setDirection(null);
      controls.set({ x: 0, opacity: 1 });
      
      // Move to the next card
      if (currentIndex < availableTokens.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 500);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentToken) return; // Don't handle keyboard events if there's no token
      
      if (e.key === "ArrowLeft") {
        handleSwipe("left");
      } else if (e.key === "ArrowRight") {
        handleSwipe("right");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, availableTokens, currentToken]);
  
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold neon-text mb-4">
            {currentCategory
              ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Tokens`
              : "Discover Tokens"}
          </h1>
          <p className="text-white/70 max-w-lg mx-auto">
            Swipe right to invest, swipe left to pass. Find your next crypto opportunity!
          </p>
        </div>
        
        <div className="max-w-sm mx-auto mb-16">
          {availableTokens.length > 0 ? (
            <div className="card-container" ref={cardRef}>
              <motion.div
                animate={controls}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, info) => handleDragEnd(info)}
                className="relative"
              >
                <TokenCard
                  token={currentToken}
                  onSwipe={handleSwipe}
                />
              </motion.div>
              
              <div className="flex justify-center mt-8 space-x-6">
                <button
                  onClick={() => handleSwipe("left")}
                  disabled={!currentToken}
                  className={`w-14 h-14 rounded-full bg-black/40 border-2 border-red-500 flex items-center justify-center
                             shadow-lg transform transition-transform hover:scale-110 ${!currentToken ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                <button
                  onClick={() => handleSwipe("right")}
                  disabled={!currentToken}
                  className={`w-14 h-14 rounded-full bg-black/40 border-2 border-green-500 flex items-center justify-center
                             shadow-lg transform transition-transform hover:scale-110 ${!currentToken ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-white/50 text-sm">
                  {currentToken ? `${currentIndex + 1} of ${availableTokens.length} tokens` : 'No more tokens'}
                </p>
              </div>
            </div>
          ) : (
            <div className="glassmorphic rounded-2xl p-8 text-center">
              <h3 className="font-orbitron text-xl font-bold text-white mb-4">
                No more tokens to swipe!
              </h3>
              <p className="text-white/70 mb-6">
                You've gone through all available tokens in this category.
              </p>
              <div className="flex flex-col space-y-4">
                <Link to="/categories" className="neon-button">
                  Explore Other Categories
                </Link>
                <Link to="/portfolio" className="neon-button">
                  View Your Portfolio
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwipePage;
