
export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  imageUrl: string;
  category: TokenCategory;
  description: string;
  riskLevel: number; // 1-10, 10 being the riskiest
}

export type TokenCategory = 
  | "meme" 
  | "risky" 
  | "new" 
  | "bluechip" 
  | "ai";

export interface User {
  id: string;
  email: string;
  defaultBuyAmount: number;
  portfolio: UserToken[];
}

export interface UserToken {
  tokenId: string;
  amount: number;
  boughtAt: number; // Price at which the token was bought
  boughtDate: Date;
}
