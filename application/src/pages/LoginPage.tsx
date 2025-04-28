
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success("Login successful! Welcome back.");
      navigate("/categories");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00FFFF22_0,transparent_70%)]"></div>
      
      <div className="z-10 max-w-md w-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Logo className="w-16 h-16" />
          </div>
          <h2 className="font-orbitron text-3xl tracking-tight neon-text">
            Welcome Back
          </h2>
          <p className="mt-2 text-white/70">
            Sign in to continue your crypto journey
          </p>
        </div>
        
        <div className="glassmorphic p-8 rounded-2xl shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none glassmorphic rounded-lg relative block w-full px-4 py-3 border
                       border-white/10 placeholder-gray-400 text-white focus:outline-none
                       focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none glassmorphic rounded-lg relative block w-full px-4 py-3 border
                       border-white/10 placeholder-gray-400 text-white focus:outline-none
                       focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-white/30 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="text-neon-blue hover:text-neon-purple">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="neon-button w-full py-3"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-white/70">
              Don't have an account?{" "}
              <Link to="/register" className="text-neon-blue hover:text-neon-purple font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
