
import { useAuth } from "../context/AuthContext";
import { Token } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTokenActions = (fetchUserData: () => Promise<void>) => {
  const { user } = useAuth();

  const buyToken = async (tokenId: string) => {
    if (!user) {
      toast.error("You need to be logged in to buy tokens");
      return;
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('default_buy_amount')
      .eq('id', user.id)
      .single();

    const ethAmount = profileData?.default_buy_amount || 0.01;
    const { data: tokenData } = await supabase
      .from('tokens')
      .select('price')
      .eq('id', tokenId)
      .single();

    if (!tokenData) {
      toast.error('Token not found');
      return;
    }

    const tokenAmount = ethAmount / tokenData.price;

    const { error } = await supabase.from('user_tokens').upsert({
      user_id: user.id,
      token_id: tokenId,
      amount: tokenAmount,
      bought_at: tokenData.price
    });

    if (error) {
      toast.error('Failed to buy token');
      return;
    }

    await fetchUserData();
    toast.success(`Bought ${tokenAmount.toFixed(2)} tokens`);
  };

  const sellToken = async (tokenId: string) => {
    if (!user) {
      toast.error("You need to be logged in to sell tokens");
      return;
    }

    const { error } = await supabase
      .from('user_tokens')
      .delete()
      .match({ user_id: user.id, token_id: tokenId });

    if (error) {
      toast.error('Failed to sell token');
      return;
    }

    await fetchUserData();
    toast.success('Token sold successfully');
  };

  const likeToken = async (token: Token) => {
    if (!user) return;

    const { error } = await supabase.from('user_token_preferences').upsert({
      user_id: user.id,
      token_id: token.id,
      preference: 'liked'
    });

    if (error) {
      toast.error('Failed to like token');
      return;
    }

    buyToken(token.id);
    await fetchUserData();
    toast.success(`Added ${token.name} to liked tokens`);
  };

  const dislikeToken = async (token: Token) => {
    if (!user) return;

    const { error } = await supabase.from('user_token_preferences').upsert({
      user_id: user.id,
      token_id: token.id,
      preference: 'disliked'
    });

    if (error) {
      toast.error('Failed to dislike token');
      return;
    }

    await fetchUserData();
    toast.info(`Added ${token.name} to disliked tokens`);
  };

  return {
    buyToken,
    sellToken,
    likeToken,
    dislikeToken
  };
};
