"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Token, TokenCategory } from "../types";
import { useTokenOperations } from "../hooks/useTokenOperations";
import { useTokenActions } from "../hooks/useTokenActions";
import { useAuth } from "./AuthContext";

interface TokenContextType {
  tokens: Token[];
  userTokens: any[];
  filteredTokens: Token[];
  currentCategory: TokenCategory | null;
  setCurrentCategory: (category: TokenCategory | null) => void;
  getTokenById: (id: string) => Token | undefined;
  buyToken: (tokenId: string) => Promise<void>;
  sellToken: (tokenId: string) => Promise<void>;
  likedTokens: string[];
  dislikedTokens: string[];
  likeToken: (token: Token) => Promise<void>;
  dislikeToken: (token: Token) => Promise<void>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [currentCategory, setCurrentCategory] = useState<TokenCategory | null>(null);
  
  const {
    tokens,
    userTokens,
    likedTokens,
    dislikedTokens,
    fetchTokens,
    fetchUserData
  } = useTokenOperations();

  const {
    buyToken,
    sellToken,
    likeToken,
    dislikeToken
  } = useTokenActions(fetchUserData);

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const filteredTokens = currentCategory
    ? tokens.filter((token) => token.category === currentCategory)
    : tokens;

  const getTokenById = (id: string) => tokens.find((token) => token.id === id);

  return (
    <TokenContext.Provider
      value={{
        tokens,
        userTokens,
        filteredTokens,
        currentCategory,
        setCurrentCategory,
        getTokenById,
        buyToken,
        sellToken,
        likedTokens,
        dislikedTokens,
        likeToken,
        dislikeToken
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokens must be used within a TokenProvider");
  }
  return context;
};
