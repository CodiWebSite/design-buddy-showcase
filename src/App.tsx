import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Audit from "./pages/Audit";
import SharedAudit from "./pages/SharedAudit";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PortfolioCase from "./pages/PortfolioCase";
import NotFound from "./pages/NotFound";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/despre" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/portofoliu/:slug" element={<PortfolioCase />} />
          <Route path="/termeni-si-conditii" element={<Terms />} />
          <Route path="/politica-de-confidentialitate" element={<Privacy />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/audit/:id" element={<SharedAudit />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFloat />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
