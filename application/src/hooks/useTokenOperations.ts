
import { useState } from "react";
import { Token } from "../types";
import { useAuth } from "../context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTokenOperations = () => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [userTokens, setUserTokens] = useState<any[]>([]);
  const [likedTokens, setLikedTokens] = useState<string[]>([]);
  const [dislikedTokens, setDislikedTokens] = useState<string[]>([]);

  const fetchTokens = async () => {
    const { data, error } = await supabase.from('tokens').select('*');
    if (error) {
      toast.error('Failed to fetch tokens');
      return;
    }
    // Transform the data to match the Token interface
    const transformedTokens: Token[] = data.map(token => ({
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      price: token.price,
      priceChange24h: token.price_change_24h,
      marketCap: token.market_cap,
      imageUrl: token.image_url,
      category: token.category,
      description: token.description,
      riskLevel: token.risk_level
    }));
    setTokens(transformedTokens);
  };

  const fetchUserData = async () => {
    if (!user) {
      setUserTokens([]);
      setLikedTokens([]);
      setDislikedTokens([]);
      return;
    }

    // Fetch user's tokens
    const { data: userTokensData, error: userTokensError } = await supabase
      .from('user_tokens')
      .select('*')
      .eq('user_id', user.id);

    if (userTokensError) {
      toast.error('Failed to fetch portfolio');
      return;
    }
    setUserTokens(userTokensData);

    // Fetch user's preferences
    const { data: preferencesData, error: preferencesError } = await supabase
      .from('user_token_preferences')
      .select('*')
      .eq('user_id', user.id);

    if (preferencesError) {
      toast.error('Failed to fetch preferences');
      return;
    }

    const liked = preferencesData
      .filter(pref => pref.preference === 'liked')
      .map(pref => pref.token_id);
    const disliked = preferencesData
      .filter(pref => pref.preference === 'disliked')
      .map(pref => pref.token_id);

    setLikedTokens(liked);
    setDislikedTokens(disliked);
  };

  return {
    tokens,
    userTokens,
    likedTokens,
    dislikedTokens,
    fetchTokens,
    fetchUserData
  };
};
