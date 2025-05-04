"use client"
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTokens } from "../context/TokenContext";
import { toast } from "sonner";

const PortfolioPage = () => {
  const { user, updateDefaultBuyAmount } = useAuth();
  const { userTokens, getTokenById, sellToken } = useTokens();
  
  const [newBuyAmount, setNewBuyAmount] = useState(() => {
    const userData = user?.user_metadata;
    return userData?.default_buy_amount || 0.01;
  });
  const [isEditing, setIsEditing] = useState(false);
  
  const handleUpdateBuyAmount = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBuyAmount <= 0) {
      toast.error("Buy amount must be greater than 0");
      return;
    }
    
    updateDefaultBuyAmount(newBuyAmount);
    setIsEditing(false);
    toast.success("Default buy amount updated successfully");
  };
  
  const handleSellToken = (tokenId: string) => {
    sellToken(tokenId);
  };
  
  const portfolioValue = userTokens.reduce((total, userToken) => {
    const token = getTokenById(userToken.tokenId);
    if (token) {
      return total + userToken.amount * token.price;
    }
    return total;
  }, 0);
  
  const totalProfitLoss = userTokens.reduce((total, userToken) => {
    const token = getTokenById(userToken.tokenId);
    if (token) {
      const currentValue = userToken.amount * token.price;
      const costBasis = userToken.amount * userToken.boughtAt;
      return total + (currentValue - costBasis);
    }
    return total;
  }, 0);
  
  const totalInvested = userTokens.reduce((total, userToken) => {
    return total + userToken.amount * userToken.boughtAt;
  }, 0);
  
  const profitLossPercentage = totalInvested > 0
    ? (totalProfitLoss / totalInvested) * 100
    : 0;
  
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold neon-text mb-4">
            Your Portfolio
          </h1>
          <p className="text-white/70 max-w-lg mx-auto">
            Manage your crypto investments and track your performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glassmorphic rounded-2xl p-6">
            <h3 className="font-orbitron text-lg text-white/70 mb-2">Portfolio Value</h3>
            <p className="font-orbitron text-2xl font-bold text-white">
              {portfolioValue.toFixed(4)} ETH
            </p>
          </div>
          
          <div className="glassmorphic rounded-2xl p-6">
            <h3 className="font-orbitron text-lg text-white/70 mb-2">Total Profit/Loss</h3>
            <p className={`font-orbitron text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLoss.toFixed(4)} ETH
              <span className="text-lg ml-1">
                ({profitLossPercentage >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%)
              </span>
            </p>
          </div>
          
          <div className="glassmorphic rounded-2xl p-6">
            <h3 className="font-orbitron text-lg text-white/70 mb-2">Default Buy Amount</h3>
            
            {isEditing ? (
              <form onSubmit={handleUpdateBuyAmount} className="flex items-center">
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={newBuyAmount}
                  onChange={(e) => setNewBuyAmount(parseFloat(e.target.value))}
                  className="appearance-none glassmorphic rounded-lg px-3 py-2 border
                         border-white/10 text-white focus:outline-none
                         focus:ring-2 focus:ring-neon-purple focus:border-transparent
                         flex-grow mr-2"
                />
                <button type="submit" className="neon-button py-2">
                  Save
                </button>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <p className="font-orbitron text-2xl font-bold text-white">
                  {user?.user_metadata?.default_buy_amount?.toFixed(3) || '0.010'} ETH
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-neon-blue hover:text-neon-purple transition-colors"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="glassmorphic rounded-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Your Tokens</h2>
          </div>
          
          {userTokens.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-orbitron text-white/70">Token</th>
                    <th className="py-4 px-6 text-right text-sm font-orbitron text-white/70">Amount</th>
                    <th className="py-4 px-6 text-right text-sm font-orbitron text-white/70">Price</th>
                    <th className="py-4 px-6 text-right text-sm font-orbitron text-white/70">Value</th>
                    <th className="py-4 px-6 text-right text-sm font-orbitron text-white/70">P&L</th>
                    <th className="py-4 px-6 text-right text-sm font-orbitron text-white/70">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {userTokens.map((userToken) => {
                    const token = getTokenById(userToken.tokenId);
                    
                    if (!token) return null;
                    
                    const currentValue = userToken.amount * token.price;
                    const costBasis = userToken.amount * userToken.boughtAt;
                    const profitLoss = currentValue - costBasis;
                    const profitLossPercent = (profitLoss / costBasis) * 100;
                    
                    return (
                      <tr key={userToken.tokenId} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <img 
                              src={token.imageUrl} 
                              alt={token.name} 
                              className="w-8 h-8 rounded-full mr-3"
                              onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/80x80/111/FFF?text=${token.symbol}`;
                              }}
                            />
                            <div>
                              <p className="font-orbitron text-white">{token.name}</p>
                              <p className="text-xs text-white/70">{token.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <p className="text-white">{userToken.amount.toFixed(2)}</p>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div>
                            <p className="text-white">${token.price.toFixed(token.price < 0.01 ? 6 : 2)}</p>
                            <p className={`text-xs ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h}%
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <p className="text-white">{currentValue.toFixed(4)} ETH</p>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <p className={profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}>
                            {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(4)} ETH
                          </p>
                          <p className={`text-xs ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {profitLossPercent >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%
                          </p>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleSellToken(userToken.tokenId)}
                            className="py-1 px-4 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            Sell
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-white/70">You don't own any tokens yet.</p>
              <button
                onClick={() => window.location.href = "/categories"}
                className="neon-button mt-4"
              >
                Discover Tokens
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
