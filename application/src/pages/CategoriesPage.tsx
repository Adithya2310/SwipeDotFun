
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTokens } from "../context/TokenContext";
import { TokenCategory } from "../types";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: TokenCategory;
  onSelect: (category: TokenCategory) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  category,
  onSelect,
}) => {
  return (
    <div
      className="glassmorphic rounded-2xl p-6 cursor-pointer transform transition-all duration-300
                 hover:shadow-neon-blue hover:scale-105"
      onClick={() => onSelect(category)}
    >
      <div className="flex flex-col h-full">
        <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-orbitron text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const { setCurrentCategory } = useTokens();
  const navigate = useNavigate();
  
  const handleCategorySelect = (category: TokenCategory) => {
    setCurrentCategory(category);
    navigate("/swipe");
  };
  
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold neon-text mb-4">
            Choose a Category
          </h1>
          <p className="text-white/70 max-w-lg mx-auto">
            Select a category to start discovering tokens that match your investment style and risk appetite.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            title="Meme Coins"
            description="Community-driven tokens inspired by internet memes and pop culture phenomena."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-blue">
                <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
                <path d="M15 3v6h6"></path>
                <path d="M10 16s.8-1 2-1 2.2 1 4 1 2-1 2-1"></path>
                <path d="M8 13h0"></path>
                <path d="M16 13h0"></path>
              </svg>
            }
            category="meme"
            onSelect={handleCategorySelect}
          />
          
          <CategoryCard
            title="Risky Degens"
            description="High-risk, high-reward tokens with potential for explosive growth but significant volatility."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="m2 12 8.5-9 8.5 9"></path>
                <path d="m2 12 8.5 9 8.5-9"></path>
                <path d="M18 12H4"></path>
                <path d="M15 7v10"></path>
              </svg>
            }
            category="risky"
            onSelect={handleCategorySelect}
          />
          
          <CategoryCard
            title="Newly Launched"
            description="Freshly launched tokens with potential for early adoption and growth opportunities."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
            }
            category="new"
            onSelect={handleCategorySelect}
          />
          
          <CategoryCard
            title="Blue Chips"
            description="Established cryptocurrencies with larger market caps, stability, and wider adoption."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple">
                <path d="M2 12h20"></path>
                <path d="M5 12v6"></path>
                <path d="M19 12v6"></path>
                <path d="M15 12v6"></path>
                <path d="M9 12v6"></path>
                <path d="M5 16h14"></path>
                <path d="M3 4v4h18V4"></path>
              </svg>
            }
            category="bluechip"
            onSelect={handleCategorySelect}
          />
          
          <CategoryCard
            title="AI Analyzed"
            description="Tokens selected through advanced AI algorithms analyzing on-chain data and market patterns."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-pink">
                <path d="M9 3H5a2 2 0 0 0-2 2v4"></path>
                <path d="M9 21H5a2 2 0 0 1-2-2v-4"></path>
                <path d="M15 3h4a2 2 0 0 1 2 2v4"></path>
                <path d="M15 21h4a2 2 0 0 0 2-2v-4"></path>
                <path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4z"></path>
                <path d="M12 10v-3"></path>
                <path d="M12 14v3"></path>
                <path d="M10 12H7"></path>
                <path d="M14 12h3"></path>
              </svg>
            }
            category="ai"
            onSelect={handleCategorySelect}
          />
          
          <div
            className="glassmorphic rounded-2xl p-6 cursor-pointer transform transition-all duration-300
                       hover:shadow-neon-purple hover:scale-105 flex flex-col justify-center items-center"
            onClick={() => {
              setCurrentCategory(null);
              navigate("/swipe");
            }}
          >
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.7 2.84"></path>
                <path d="M9 17H7"></path>
                <path d="M13 17h-1"></path>
                <path d="M22 12v1"></path>
                <path d="M21 15h-1"></path>
                <path d="M19 19h-2"></path>
                <path d="M15 21v-2"></path>
                <path d="M12 22h-1"></path>
                <path d="M7 21H5"></path>
                <path d="M3 17v-2"></path>
                <path d="M2 9V7"></path>
                <path d="M6 3H4"></path>
                <path d="M11 2h-1"></path>
                <path d="M15 5c.71 0 1.36-.24 1.9-.64a10 10 0 0 0-6.64-2.31"></path>
                <path d="M15.65 14H15c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1"></path>
              </svg>
            </div>
            <h3 className="font-orbitron text-xl font-bold text-white mb-2">All Tokens</h3>
            <p className="text-white/70 text-sm">Browse through all available tokens across categories.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
