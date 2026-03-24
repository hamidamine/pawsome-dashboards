import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Walker routes */}
          <Route path="/walker" element={<WalkerDashboard />} />
          <Route path="/walker/favoris" element={<WalkerFavoris />} />
          <Route path="/walker/messages" element={<Messages role="walker" />} />
          <Route path="/walker/profil" element={<Profil role="walker" />} />
          <Route path="/walker/go" element={<WalkerDashboard />} />
          <Route path="/walker/notifications" element={<Notifications role="walker" />} />
          <Route path="/walker/historique" element={<BookingHistory role="walker" />} />
          <Route path="/walker/onboarding" element={<WalkerOnboarding />} />

          {/* Owner routes */}
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/favoris" element={<OwnerFavoris />} />
          <Route path="/owner/messages" element={<Messages role="owner" />} />
          <Route path="/owner/profil" element={<Profil role="owner" />} />
          <Route path="/owner/notifications" element={<Notifications role="owner" />} />
          <Route path="/owner/reserver" element={<BookingPage />} />
          <Route path="/owner/historique" element={<BookingHistory role="owner" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
