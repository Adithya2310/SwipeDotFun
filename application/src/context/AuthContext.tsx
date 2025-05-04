"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, defaultBuyAmount: number) => Promise<void>;
  logout: () => Promise<void>;
  updateDefaultBuyAmount: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/categories');
    } catch (error) {
      toast.error("Failed to login");
      throw error;
    }
  };

  const register = async (email: string, password: string, defaultBuyAmount: number) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            default_buy_amount: defaultBuyAmount,
          },
        },
      });

      if (error) throw error;
      router.push('/categories');
    } catch (error) {
      toast.error("Failed to register");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
    } catch (error) {
      toast.error("Error signing out");
      throw error;
    }
  };

  const updateDefaultBuyAmount = async (amount: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ default_buy_amount: amount })
        .eq('id', user.id);

      if (error) throw error;
      toast.success("Updated default buy amount");
    } catch (error) {
      toast.error("Failed to update default buy amount");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateDefaultBuyAmount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
