
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`${className} relative`}>
      <img 
        src="/lovable-uploads/68c8fb0b-0a3c-4f71-adcd-7f8b90f4ef52.png" 
        alt="CoinSwipe Logo" 
        className="w-full h-full animate-pulse-glow"
      />
    </div>
  );
};

export default Logo;
