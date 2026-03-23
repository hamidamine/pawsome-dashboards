import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import WalkerDashboard from "./pages/WalkerDashboard.tsx";
import OwnerDashboard from "./pages/OwnerDashboard.tsx";
import OwnerFavoris from "./pages/OwnerFavoris.tsx";
import WalkerFavoris from "./pages/WalkerFavoris.tsx";
import Messages from "./pages/Messages.tsx";
import Profil from "./pages/Profil.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/walker" element={<WalkerDashboard />} />
          <Route path="/walker/favoris" element={<WalkerFavoris />} />
          <Route path="/walker/messages" element={<Messages role="walker" />} />
          <Route path="/walker/profil" element={<Profil role="walker" />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/favoris" element={<OwnerFavoris />} />
          <Route path="/owner/messages" element={<Messages role="owner" />} />
          <Route path="/owner/profil" element={<Profil role="owner" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
