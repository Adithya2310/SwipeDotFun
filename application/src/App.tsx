
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TokenProvider } from "./context/TokenContext";
import NavBar from "./components/NavBar";
import MobileNav from "./components/MobileNav";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import SwipePage from "./pages/SwipePage";
import PortfolioPage from "./pages/PortfolioPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TokenProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavBar />
          <MobileNav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/categories"
              element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>}
            />
            <Route
              path="/swipe"
              element={<ProtectedRoute><SwipePage /></ProtectedRoute>}
            />
            <Route
              path="/portfolio"
              element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
