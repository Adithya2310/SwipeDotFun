
import React from 'react';
import { motion } from 'framer-motion';
import { Token } from '../types';

interface TokenCardProps {
  token?: Token;
  onSwipe?: (direction: string) => void;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, onSwipe }) => {
  // If the token is undefined, return a placeholder card
  if (!token) {
    return (
      <div className="swipe-card w-full max-w-sm mx-auto glassmorphic p-8 text-center">
        <h3 className="font-orbitron text-xl font-bold text-white mb-4">
          No token available
        </h3>
        <p className="text-white/70">
          There are no more tokens to display in this category.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="swipe-card w-full max-w-sm mx-auto"
      drag={true}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.8}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ scale: 1.05 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) > 100;
        if (swipe) {
          const direction = offset.x > 0 ? 'right' : 'left';
          onSwipe && onSwipe(direction);
        }
      }}
    >
      <div className="swipe-card-inner relative">
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 flex items-center">
          <span 
            className={`text-sm font-bold ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h}%
          </span>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <img 
            src={token.imageUrl} 
            alt={token.name} 
            className="w-24 h-24 object-contain rounded-full mb-2"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/80x80/111/FFF?text=${token.symbol}`;
            }}
          />
          
          <h2 className="text-xl font-orbitron font-bold text-white">{token.name}</h2>
          <p className="text-lg text-neon-blue">{token.symbol}</p>
          
          <div className="bg-black/30 backdrop-blur-sm w-full rounded-xl py-3 px-4 flex justify-between items-center">
            <span className="text-white text-sm">Price</span>
            <span className="text-lg font-bold text-white">${token.price.toFixed(token.price < 0.01 ? 8 : 2)}</span>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm w-full rounded-xl py-3 px-4 flex justify-between items-center">
            <span className="text-white text-sm">Market Cap</span>
            <span className="text-lg font-bold text-white">
              ${(token.marketCap / 1000000).toFixed(1)}M
            </span>
          </div>
          
          <div className="mt-4 w-full">
            <div className="text-sm text-white/70 mb-2">Risk Level</div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full ${token.riskLevel <= 3 ? 'bg-green-500' : token.riskLevel <= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${token.riskLevel * 10}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-white/50">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-white/80 text-sm">{token.description}</p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        
        <div className="flex justify-center mt-4 text-xs text-white/60">
          <span>Swipe left to skip, right to buy</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenCard;
