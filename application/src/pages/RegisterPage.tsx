
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [defaultBuyAmount, setDefaultBuyAmount] = useState(0.01);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (!email || !password || !confirmPassword) {
        toast.error("All fields are required");
        return;
      }
      
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      
      setCurrentStep(2);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(email, password, defaultBuyAmount);
      toast.success("Registration successful! Welcome to CoinSwipe.");
      navigate("/categories");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#A020F022_0,transparent_70%)]"></div>
      
      <div className="z-10 max-w-md w-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Logo className="w-16 h-16" />
          </div>
          <h2 className="font-orbitron text-3xl tracking-tight neon-text-purple">
            Create Your Account
          </h2>
          <p className="mt-2 text-white/70">
            Join CoinSwipe to discover exciting crypto opportunities
          </p>
        </div>
        
        <div className="glassmorphic p-8 rounded-2xl shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {currentStep === 1 ? (
              <>
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
                           focus:ring-2 focus:ring-neon-purple focus:border-transparent"
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none glassmorphic rounded-lg relative block w-full px-4 py-3 border
                           border-white/10 placeholder-gray-400 text-white focus:outline-none
                           focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-white mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none glassmorphic rounded-lg relative block w-full px-4 py-3 border
                           border-white/10 placeholder-gray-400 text-white focus:outline-none
                           focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="default-buy-amount" className="block text-sm font-medium text-white mb-1">
                  Default Buy Amount (ETH)
                </label>
                <input
                  id="default-buy-amount"
                  name="default-buy-amount"
                  type="number"
                  step="0.001"
                  min="0.001"
                  required
                  value={defaultBuyAmount}
                  onChange={(e) => setDefaultBuyAmount(parseFloat(e.target.value))}
                  className="appearance-none glassmorphic rounded-lg relative block w-full px-4 py-3 border
                         border-white/10 placeholder-gray-400 text-white focus:outline-none
                         focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                  placeholder="0.01"
                />
                <p className="mt-1 text-xs text-white/60">
                  This is the amount of ETH that will be used when you swipe right on a token.
                </p>
              </div>
            )}
            
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
                    Processing...
                  </span>
                ) : currentStep === 1 ? (
                  "Continue"
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            
            {currentStep === 2 && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-neon-blue hover:text-neon-purple text-sm"
                >
                  Back to previous step
                </button>
              </div>
            )}
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-white/70">
              Already have an account?{" "}
              <Link to="/login" className="text-neon-blue hover:text-neon-purple font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
