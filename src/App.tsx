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
import Notifications from "./pages/Notifications";
import BookingPage from "./pages/BookingPage";
import BookingHistory from "./pages/BookingHistory";
import WalkerOnboarding from "./pages/WalkerOnboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="text-2xl animate-pulse">🐾</div></div>;
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
      
      {/* Walker routes */}
      <Route path="/walker" element={<ProtectedRoute><WalkerDashboard /></ProtectedRoute>} />
      <Route path="/walker/favoris" element={<ProtectedRoute><WalkerFavoris /></ProtectedRoute>} />
      <Route path="/walker/messages" element={<ProtectedRoute><Messages role="walker" /></ProtectedRoute>} />
      <Route path="/walker/profil" element={<ProtectedRoute><Profil role="walker" /></ProtectedRoute>} />
      <Route path="/walker/go" element={<ProtectedRoute><WalkerDashboard /></ProtectedRoute>} />
      <Route path="/walker/notifications" element={<ProtectedRoute><Notifications role="walker" /></ProtectedRoute>} />
      <Route path="/walker/historique" element={<ProtectedRoute><BookingHistory role="walker" /></ProtectedRoute>} />
      <Route path="/walker/onboarding" element={<ProtectedRoute><WalkerOnboarding /></ProtectedRoute>} />
      
      {/* Owner routes */}
      <Route path="/owner" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
      <Route path="/owner/favoris" element={<ProtectedRoute><OwnerFavoris /></ProtectedRoute>} />
      <Route path="/owner/messages" element={<ProtectedRoute><Messages role="owner" /></ProtectedRoute>} />
      <Route path="/owner/profil" element={<ProtectedRoute><Profil role="owner" /></ProtectedRoute>} />
      <Route path="/owner/notifications" element={<ProtectedRoute><Notifications role="owner" /></ProtectedRoute>} />
      <Route path="/owner/reserver" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
      <Route path="/owner/historique" element={<ProtectedRoute><BookingHistory role="owner" /></ProtectedRoute>} />
      
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
