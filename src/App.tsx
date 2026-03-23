import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Index from "./pages/Index";
import WalkerDashboard from "./pages/WalkerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerFavoris from "./pages/OwnerFavoris";
import WalkerFavoris from "./pages/WalkerFavoris";
import Messages from "./pages/Messages";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="text-2xl">🐾</div></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="text-2xl animate-pulse">🐾</div></div>;
  }

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/walker" element={<ProtectedRoute><WalkerDashboard /></ProtectedRoute>} />
      <Route path="/walker/favoris" element={<ProtectedRoute><WalkerFavoris /></ProtectedRoute>} />
      <Route path="/walker/messages" element={<ProtectedRoute><Messages role="walker" /></ProtectedRoute>} />
      <Route path="/walker/profil" element={<ProtectedRoute><Profil role="walker" /></ProtectedRoute>} />
      <Route path="/walker/go" element={<ProtectedRoute><WalkerDashboard /></ProtectedRoute>} />
      <Route path="/owner" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
      <Route path="/owner/favoris" element={<ProtectedRoute><OwnerFavoris /></ProtectedRoute>} />
      <Route path="/owner/messages" element={<ProtectedRoute><Messages role="owner" /></ProtectedRoute>} />
      <Route path="/owner/profil" element={<ProtectedRoute><Profil role="owner" /></ProtectedRoute>} />
      <Route path="/owner/reserver" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
